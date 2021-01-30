
import React, { useContext, useEffect, useState } from "react";
import { TypingContext } from "../context/typing-context";
import { useEventListener } from "../hooks/useEventListener";
import styled from 'styled-components'

const ESCAPE_KEYS = ["27", "Escape"];

const StyledSpan = styled.span`
  color: ${props => props.color}
`

const TypingTrainer = props => {
    useEffect(() => {
        console.log('Rendered')
    })

    const text = 'loverm asdf aewasdcvasg asdf wa asdf awasdf asdf'.split('')

    const [textWithProps, setTextWithProps] = useState(text.map(el => ({ text: el, color: 'gray' })))

    const [typedTexts, setTypedTexts] = useState([])

    const keyhandler = ({ key }) => {
      if (key === 'Backspace') {
          typedTexts.pop()
          setTypedTexts([...typedTexts])
      } else {
          setTypedTexts([...typedTexts, key])
      }

      console.log("key", key);
    };

    useEffect(() => {
      console.log("typedTexts", typedTexts);
      typedTexts.forEach((el, index) => {
        const textWithProp = textWithProps[index]
        if (el === textWithProp.text) {
          textWithProp.color = 'green'
        } else {
          textWithProp.color = 'red'
        }

        setTextWithProps([...textWithProps])
      })
      console.log("textWithProps", {...textWithProps});

    }, [typedTexts])

    useEventListener("keydown", keyhandler);

    return (
        <div>
            {textWithProps?.map((el, index) => (
                <StyledSpan color={el.color} key={index}>{el.text}</StyledSpan>
            ))}
        </div>
    )
}

export { TypingTrainer }