import {useState} from 'react';

export default function Feedback() {
  const [cardActive, setCardActive] = useState(null);

  return (
    <>
    
      <section id='Feedback'>
        <p>Your feedback shapes Portfolio Builder. Tell us what you think — we read every submission.</p>
        
        <div className="FeedbackType">
          <div className={`FeedCard ${cardActive === 0 ? "active" : ""}`}
            onClick={
              () => {
                setCardActive(0);
              }
            }>
            <span>🚀</span>
            <h3>Feature Request</h3>
          </div>
          <div className={`FeedCard ${cardActive === 1 ? "active" : ""}`}
            onClick={
              () => {
                setCardActive(1);
              }
            }>
            <span>🪲</span>
            <h3>Bug Report</h3>
          </div>
          <div className={`FeedCard ${cardActive === 2 ? "active" : ""}`}
            onClick={
              () => {
                setCardActive(2);
              }
            }>
            <span>💡</span>
            <h3>Suggestion</h3>
          </div>
          <div className={`FeedCard ${cardActive === 3 ? "active" : ""}`}
            onClick={
              () => {
                setCardActive(3);
              }
            }>
            <span>💖</span>
            <h3>General Love</h3>
          </div>
        </div>

        <p>Your Feedback</p>

        <textarea name="feedback" id="feedbackBox" placeholder='Share your thoughts - Every word matters...'></textarea>

        <div className="submitFeed">
          <button>Submit Feedback →</button>
          <p>Anonymous submissions welcome</p>
        </div>
      </section>
    
    </>
  )
}
