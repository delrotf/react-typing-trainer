
import React, { useContext, useEffect, useState } from "react";
import { TypingContext } from "../context/typing-context";
import { useEventListener } from "../hooks/useEventListener";
import styled from 'styled-components'

const ESCAPE_KEYS = ["27", "Escape"];

const StyledSpan = styled.span`
  color: ${props => props.color};
  background-color: ${props => props.backgroundColor ? props.backgroundColor : 'unset'};
  &:after {
    content: '|';
    color: ${props => props.current ? 'yellow' : 'lightgray'};
  }
`

const TypingTrainer = props => {
    useEffect(() => {
        console.log('Rendered')
    })

    const text = 'loverm asdf aewasdcvasg asdf wa asdf awasdf asdf'.split('')

    const [textWithProps, setTextWithProps] = useState(text.map(el => ({ text: el, current: false, color: 'gray', backgroundColor: 'unset' })))

    const [typedTexts, setTypedTexts] = useState([])

    const keyhandler = ({ key }) => {
      if (key === 'Backspace') {
          typedTexts.pop()
          setTypedTexts([...typedTexts])
      } else if (key !== 'Shift') {
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
            el.color = 'green'

            if (el.text === ' ') {
              el.backgroundColor = 'unset'
            }
          } else {
            el.color = 'red'

            if (el.text === ' ') {
              el.backgroundColor = 'red'
            }
          }
        } else {
          el.color = 'grey'
          el.current = false
          el.backgroundColor = 'unset'
        }
      })

      setTextWithProps([...textWithProps])
    }, [typedTexts])

    useEventListener("keydown", keyhandler);

    return (
        <div className='typing-trainer'>
            {textWithProps?.map((el, index) => (
                <StyledSpan current={el.current} color={el.color} backgroundColor={el.backgroundColor} key={index}>{el.text}</StyledSpan>
            ))}
        </div>
    )
}

export { TypingTrainer }