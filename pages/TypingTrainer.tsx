
import React, { useContext, useEffect, useState } from "react";
import { TypingContext } from "../context/typing-context";
import { useEventListener } from "../hooks/useEventListener";
import styled from 'styled-components'

const ESCAPE_KEYS = ["27", "Escape"];

const StyledSpan = styled.span`
  &:before {
    content: '|';
    color: ${props => props.initial ? 'yellow' : 'lightgray'};
    ${props => props.space ? 'top: -23px' : ''}
  }
  &:after {
    content: '|';
    color: ${props => props.current ? 'yellow' : 'lightgray'};
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
    <div className='typing-trainer'>
        {textWithProps?.map((el, index) => (
            <StyledSpan initial={typedTexts.length === 0 && index === 0} current={el.current} space={el.text === ' '} className={el.className} key={index}>{el.text}</StyledSpan>
        ))}
    </div>
  )
}

export { TypingTrainer }