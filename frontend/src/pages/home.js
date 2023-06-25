import logo from './logo.svg';
import './home.css';
import img_1 from '../img/1.png'
import img_2 from '../img/2.png'
import img_3 from '../img/3.png'
import axios from 'axios'
import { useReducer, useState } from "react";
import StudyTopic from '../component/studyTopic'
import Flashcard from '../component/flashcard'

function App() {
  const [topics, setTopics] = useState(null);
  const [isLoading, setIsLoading] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [breakdown, setBreakdown] = useState(null)


  function getStudyTopics() {
    return breakdown.map((topic) => <StudyTopic topic={topic} />)
  }


  function getTopics() {
    setSubmitted(true)
    setIsLoading(true)

    axios
      .post(
        "http://127.0.0.1:5001/api/analyze-topics",
        {
          topics: topics,
        }
      )
      .then(
        (response) => {
          setBreakdown(response.data)
        })
      .finally(() => {
        setIsLoading(false)
      })

  }

  return (
    <div className="App container pb-5">
      <Flashcard />
      <div class="text-center my-2 mb-5 ">
        <p class="text-large text-white display-1">StudyWise</p>
        <p class="text-large text-white h5 mx-5">Revolutionize your studying! Enter topics, get personalized study materials, plans, and more. Our LLM-powered platform makes learning a breeze. Try it now for the ultimate studying experience!</p>
      </div>

      {isLoading ?
        <div class="d-flex justify-content-center">
          <div class="spinner-border" role="status">
            <span class="sr-only"></span>
          </div>
        </div> : null}


      {!submitted ?
        <div>
          <div class="container mt-2 bg-light p-2 rounded-2 ">
            <div class="justify-content-center">
              <div class="col">
                <form>
                  <div class="mb-3">
                    <label for="topics" class="form-label">Enter URLs for your notes to create your study guide!</label>
                    <input type="text" class="form-control" id="topics" value={topics} placeholder="Topic1.pdf, Topic2.html, ..." onChange={(e) => setTopics(e.target.value)} />
                  </div>
                  <button type="submit" class="btn btn-primary" onClick={getTopics}>Generate Study Guide</button>
                </form>
              </div>
            </div>
          </div>
          <div className="mt-3 text-center">
          </div>
          <div class="row mt-5">
            <div class="col-sm-4">
              <div class="card w-75 mx-auto bg-dark">
                <img src={img_1} class="card-img-top" alt="Benefit 1" />
                <div class="card-body">
                  <h5 class="card-title text-white">Efficient Study Materials</h5></div>
              </div>
            </div>
            <div class="col-sm-4">
              <div class="card w-75 mx-auto bg-dark">
                <img src={img_2} class="card-img-top" alt="Benefit 2" />
                <div class="card-body">
                  <h5 class="card-title text-white">Personalized Study Plans</h5> </div>
              </div>
            </div>
            <div class="col-sm-4">
              <div class="card w-75 mx-auto bg-dark">
                <img src={img_3} class="card-img-top" alt="Benefit 3" />
                <div class="card-body">
                  <h5 class="card-title text-white">Concise Notes and Flashcards</h5></div>
              </div>
            </div>
          </div>
        </div>
        : null}

      {breakdown ? getStudyTopics() : null}

    </div>
  );
}

export default App;
