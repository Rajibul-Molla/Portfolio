import React, { useState, useEffect } from 'react';

const DEFAULT_WORDS = ['Freelancer', 'Software Engineer', 'Full-Stack Developer'];

/**
 * Typewriter component for animated role text with blinking cursor.
 * Cycles through words: types, pauses, deletes, switches to the next word, and loops.
 */
function Typewriter({
  words,
  word,
  typeSpeed = 130,
  deleteSpeed = 70,
  delayBeforeDelete = 1800,
  delayBeforeType = 500,
}) {
  const wordList = Array.isArray(words) && words.length > 0
    ? words
    : (word ? [word] : DEFAULT_WORDS);

  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [typedText, setTypedText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  const currentWord = wordList[currentWordIndex % wordList.length] || '';

  useEffect(() => {
    let timer;

    if (!isDeleting && typedText === currentWord) {
      // Completed typing current word: pause before starting deletion
      timer = setTimeout(() => {
        setIsDeleting(true);
      }, delayBeforeDelete);
    } else if (isDeleting && typedText === '') {
      // Completed deleting: switch to next word and pause before typing
      timer = setTimeout(() => {
        setIsDeleting(false);
        setCurrentWordIndex((prev) => (prev + 1) % wordList.length);
      }, delayBeforeType);
    } else {
      // In progress of typing or deleting
      const speed = isDeleting ? deleteSpeed : typeSpeed;
      timer = setTimeout(() => {
        setTypedText((current) =>
          isDeleting
            ? current.slice(0, -1)
            : currentWord.slice(0, current.length + 1)
        );
      }, speed);
    }

    return () => clearTimeout(timer);
  }, [
    typedText,
    isDeleting,
    currentWord,
    wordList.length,
    typeSpeed,
    deleteSpeed,
    delayBeforeDelete,
    delayBeforeType,
  ]);

  return (
    <>
      <span className="role-typed">{typedText}</span>
      <span className="role-cursor" aria-hidden="true">|</span>
    </>
  );
}

export default Typewriter;
