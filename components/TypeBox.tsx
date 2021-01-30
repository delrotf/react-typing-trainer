
import React, { useContext, useEffect, useState } from "react";
import { TypingContext } from "../context/typing-context";
import { useEventListener } from "../hooks/useEventListener";
import styled from 'styled-components'

const cursorColor = '#e2b714'

const StyledSpan = styled.span`
  ${props => props.children === ' ' ? 'height: 1px; width: 10px; position: relative; left: 5px;' : ''}
  &:before {
    content: '|';
    animation: blinker 1s linear infinite;
    font-size: 36px;
    color: ${props => props.current ? cursorColor : 'transparent'};
    ${props => props.children === ' ' ? `position: relative; top: -23px; left: -5px` : ''}
  }
`

const TypeBox = props => {
  const { typedTexts, setTypedTexts, text } = useContext(TypingContext)

  const [textWithProps, setTextWithProps] = useState(text.map(el => ({ text: el, current: false, className: 'orig' })))


  const keyPressHandler = ({ key }) => {
    if (typedTexts.length < textWithProps.length) {
      setTypedTexts([...typedTexts, key])
    }
  };

  const keyDownHandler = ({ key }) => {
    if (key === 'Backspace') {
        typedTexts.pop()
        setTypedTexts([...typedTexts])
    }
  };

  useEffect(() => {
    textWithProps.forEach((el, index) => {
      if (typedTexts.length === index) {
        el.current = true;
      } else {
        el.current = false;
      }

      if (typedTexts.length > index) {
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
      }
    })

    setTextWithProps([...textWithProps])
  }, [typedTexts])

  useEventListener("keypress", keyPressHandler);
  useEventListener("keydown", keyDownHandler);

  return (
    <div className='type-box'>
      <div className='type-container p-5 flex-wrap'>
          {textWithProps?.map((el, index) => (
              <StyledSpan initial={typedTexts.length === 0 && index === 0} current={el.current} className={el.className} key={index}>{el.text}</StyledSpan>
          ))}
      </div>
    </div>
  )
}

export { TypeBox }