import { useState, useEffect } from "react";
import flashcards from "../img/flashcards.png"
import img_1 from '../img/1.png'
import img_2 from '../img/2.png'
import img_3 from '../img/3.png'
import { motion } from "framer-motion"
import Flashcard from "./flashcard";
import axios from 'axios'
import "./studyTopics.css"

function StudyTopic(props) {
    const topic = props.topic
    const links = props.links

    const [isTopicOpen, setIsTopicOpen] = useState(false)
    const [isFlashcardsOpen, setIsFlashcardsOpen] = useState(false)
    const [isNotesOpen, setIsNotesOpen] = useState(false)
    const [isLoading, setIsLoading] = useState(0)
    const [questions, setQuestions] = useState([])
    const [notes, setNotes] = useState(null)


    useEffect(() => {
        axios
            .post(
                "http://127.0.0.1:5001/api/notes",
                {
                    topic: topic,
                    links: links
                }
            )
            .then(
                (response) => {
                    setNotes(response.data)
                    console.log(response.data)
                })
            .finally(() => {
                setIsLoading(isLoading + 1)
            })

        axios
            .post(
                "http://127.0.0.1:5001/api/flashcards",
                {
                    topic: topic,
                    links: links
                }
            )
            .then(
                (response) => {
                    setQuestions(response.data)
                    console.log(response.data)
                })
            .finally(() => {
                setIsLoading(isLoading + 1)
            })

    });


    function getFlashcards() {

        if (questions.length == 0) {
            return []
        }


        return questions.map((value, index) => (
            index % 3 === 0 ? (
                <div key={index} className="row">
                    <div className="col-sm-4">
                        <Flashcard question={questions[index]["question"]} answer={questions[index]["answer"]} />
                    </div>
                    {index + 1 < questions.length && (
                        <div className="col-sm-4">
                            <Flashcard question={questions[index + 1]["question"]} answer={questions[index + 1]["answer"]} />
                        </div>
                    )}
                    {index + 2 < questions.length && (
                        <div className="col-sm-4">
                            <Flashcard question={questions[index + 2]["question"]} answer={questions[index + 2]["answer"]} />
                        </div>
                    )}
                </div>
            ) : null
        ))

    }

    return (
        <div>
            <motion.div layout="position"
                transition={{
                    layout: { duration: 0.3 }
                }} className="bg-info card m-5 p-5" onClick={() => { setIsTopicOpen(true) }}>

                <motion.div layout="position" className="my-auto">
                    <motion.div class="row justify-content-between text-white">
                        <div class="col-4 h2">
                            <motion.div layout="position" >
                                {topic}
                            </motion.div>
                            {isLoading < 1 ? <div class="spinner-border m-2" role="status">
                                <span class="sr-only"></span>
                            </div>
                                : null}
                        </div>


                        <motion.div layout="position" class="col-4 h3">
                            Expected Time: {Math.floor(Math.random() * 3) + 1} Hour(s)
                        </motion.div>
                    </motion.div>

                    {isTopicOpen ?

                        <motion.div class="row mt-5">
                            <motion.div class="col-sm-4">
                                <motion.div class="card w-75 mx-auto bg-dark" onClick={() => setIsFlashcardsOpen(!isFlashcardsOpen)}>
                                    <motion.img layout="position" src={flashcards} class="card-img-top" alt="Benefit 1" />
                                    <motion.div class="card-body">
                                        <motion.h5 class="card-title text-white">Flashcards</motion.h5></motion.div>
                                </motion.div>

                            </motion.div>
                            <motion.div class="col-sm-4">
                                <motion.div class="card w-75 mx-auto bg-dark" onClick={() => setIsNotesOpen(!isNotesOpen)}>
                                    <motion.img layout="position" src={img_2} class="card-img-top" alt="Benefit 2" />
                                    <motion.div class="card-body">
                                        <motion.h5 class="card-title text-white">Notes</motion.h5> </motion.div>
                                </motion.div>
                            </motion.div>
                        </motion.div>

                        : null}

                </motion.div>


                {isFlashcardsOpen ?
                    <div className="p-2 mt-4 bg-primary rounded">
                        {getFlashcards()}
                    </div>
                    : null}

                {isNotesOpen ?
                    <div className="p-2 mt-4 bg-dark text-white rounded display-linebreak overflow-auto">
                        {notes ? notes["notes"] : null}
                    </div>
                    : null}


            </motion.div>
        </div>
    );
}

export default StudyTopic
