import React, { useState } from "react";
import ReactDOM from "react-dom";

const Anecdote = ({ text, votes }) => (
  <div>
    <p>{text}</p>
    <p>has {votes} votes</p>
  </div>
);

const App = props => {
  const [selected, setSelected] = useState(0);
  const [votes, setVotes] = useState(Array(anecdotes.length));

  const maxVotes = [...votes].sort((m, n) => n - m)[0];
  let mostVoted = votes.indexOf(maxVotes);
  mostVoted = mostVoted === -1 ? 0 : mostVoted;
  console.log(maxVotes);

  const getRandomInt = max => Math.floor(Math.random() * Math.floor(max));

  return (
    <div>
      <h3>Anecdote of the day</h3>
      <Anecdote text={props.anecdotes[selected]} votes={votes[selected] || 0} />
      <button
        onClick={() => {
          const copy = [...votes];
          copy[selected] = (copy[selected] || 0) + 1;
          setVotes(copy);
        }}
      >
        vote
      </button>
      <button onClick={() => setSelected(getRandomInt(anecdotes.length))}>
        next anecdote
      </button>
      <h3>Anecdote with most votes</h3>
      <Anecdote
        text={props.anecdotes[mostVoted]}
        votes={votes[mostVoted] || 0}
      />
    </div>
  );
};

const anecdotes = [
  "If it hurts, do it more often",
  "Adding manpower to a late software project makes it later!",
  "The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
  "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
  "Premature optimization is the root of all evil.",
  "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it."
];

ReactDOM.render(<App anecdotes={anecdotes} />, document.getElementById("root"));
