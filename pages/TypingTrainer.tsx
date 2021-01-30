
import React, { useContext, useEffect, useState } from "react";
import { TypingContext } from "../context/typing-context";
import { useEventListener } from "../hooks/useEventListener";
import styled from 'styled-components'

const ESCAPE_KEYS = ["27", "Escape"]
const cursorColor = '#e2b714'

const StyledSpan = styled.span`
  ${props => props.children === ' ' ? 'height: 1px;' : ''}
  &:before {
    content: '|';
    animation: blinker 1s linear infinite;
    color: ${props => props.initial ? cursorColor : 'transparent'};
    ${props => props.children === ' ' ? `position: relative; top: -23px;` : ''}
  }
  &:after {
    content: '|';
    animation: blinker 1s linear infinite;
    color: ${props => props.current ? cursorColor : 'transparent'};
    ${props => props.children === ' ' ? `position: relative; top: -23px;` : ''}
  }
  @keyframes blinker {
    50% {
      opacity: 0;
    }
  }
`

const TypingTrainer = props => {
  useEffect(() => {
      console.log('Rendered')
  })

  const text = 'The fox jumped over the lazy dog'.split('')

  const [textWithProps, setTextWithProps] = useState(text.map(el => ({ text: el, current: false, className: 'orig' })))

  const [typedTexts, setTypedTexts] = useState([])

  const keyhandler = ({ key }) => {
    if (key === 'Backspace') {
        typedTexts.pop()
        setTypedTexts([...typedTexts])
    } else if (typedTexts?.length < textWithProps?.length && key !== 'Shift') {
        setTypedTexts([...typedTexts, key])
    }
  };

  useEffect(() => {
    textWithProps.forEach((el, index) => {
      if (typedTexts.length > index) {
        if (typedTexts.length-1 === index) {
          el.current = true;
        } else {
          el.current = false;
        }

        const typedText = typedTexts[index]
        if (el.text === typedText) {
          el.className = 'correct'

          if (el.text === ' ') {
            el.className = 'correct-space'
          }
        } else {
          el.className = 'wrong'

          if (el.text === ' ') {
            el.className = 'wrong-space'
          }
        }
      } else {
        el.className = 'orig'
        el.current = false
      }
    })

    setTextWithProps([...textWithProps])
  }, [typedTexts])

  useEventListener("keydown", keyhandler);

  return (
    <div className='typing-trainer p-5'>
      <div className='typing-container p-5 flex-wrap'>
          {textWithProps?.map((el, index) => (
              <StyledSpan initial={typedTexts.length === 0 && index === 0} current={el.current} className={el.className} key={index}>{el.text}</StyledSpan>
          ))}
      </div>
    </div>
  )
}

export { TypingTrainer }