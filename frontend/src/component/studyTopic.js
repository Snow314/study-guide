import { useState } from "react";
import flashcards from "../img/flashcards.png"
import img_1 from '../img/1.png'
import img_2 from '../img/2.png'
import img_3 from '../img/3.png'
import { motion } from "framer-motion"

function StudyTopic(props) {
    const topic = props.topic
    const [isTopicOpen, setIsTopicOpen] = useState(false)

    return (
        <div>
            <motion.div layout="position"
                transition={{
                    layout: { duration: 0.3 }
                }} className="bg-info card m-5 p-5" onClick={() => { setIsTopicOpen(!isTopicOpen) }}>
                <motion.div layout="position" className="my-auto">
                    <motion.div class="row justify-content-between text-white">
                        <motion.div layout="position" class="col-4 h2">
                            {topic}
                        </motion.div>
                        <motion.div layout="position" class="col-4 h3">
                            Expected Time: 2 Hours
                        </motion.div>
                    </motion.div>

                    {isTopicOpen ?

                        <motion.div class="row mt-5">
                            <motion.div class="col-sm-4">
                                <motion.div class="card w-75 mx-auto bg-dark">
                                    <motion.img layout="position" src={flashcards} class="card-img-top" alt="Benefit 1" />
                                    <motion.div class="card-body">
                                        <motion.h5 class="card-title text-white">Flashcards</motion.h5></motion.div>
                                </motion.div>
                            </motion.div>
                            <motion.div class="col-sm-4">
                                <motion.div class="card w-75 mx-auto bg-dark">
                                    <motion.img layout="position" src={img_2} class="card-img-top" alt="Benefit 2" />
                                    <motion.div class="card-body">
                                        <motion.h5 class="card-title text-white">Notes</motion.h5> </motion.div>
                                </motion.div>
                            </motion.div>
                            <motion.div class="col-sm-4">
                                <motion.div class="card w-75 mx-auto bg-dark">
                                    <motion.img layout="position" src={img_3} class="card-img-top" alt="Benefit 3" />
                                    <motion.div class="card-body">
                                        <motion.h5 class="card-title text-white">Concise Notes and Flashcards</motion.h5></motion.div>
                                </motion.div>
                            </motion.div>
                        </motion.div>

                        : null}
                </motion.div>

            </motion.div>
        </div>
    );
}

export default StudyTopic
