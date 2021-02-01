
import React, { useContext, useEffect, useRef, useState } from "react";
import { TypingContext } from "../../context/typing-context";
import { useEventListener } from "../../hooks/useEventListener";
import styled from 'styled-components'
import { Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRedo } from "@fortawesome/free-solid-svg-icons";
import useHttp from "../../hooks/useHttp";
import './TypeBox.scss';

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
  const { typedTexts, setTypedTexts, text, setText, arrayOfTexts, setArrayOfTexts, setSecondsLapsed, done, setDone, reset, setReset } = useContext(TypingContext)

  const [textWithProps, setTextWithProps] = useState([])

  const {
    isLoading,
    error,
    data,
    sendRequest,
    reqExtra,
    reqIdentifer,
    clear
  } = useHttp();

  useEffect(() => {
    setReset(prev => prev++)
  }, [])

  useEffect(() => {
    if (arrayOfTexts && arrayOfTexts.length) {
      setText(arrayOfTexts.pop())
    } else {
      sendRequest(
        'https://baconipsum.com/api/?type=meat-and-filler',
        "GET",
        null,
        null,
        null
      );
    }
  }, [reset]);

  // load data
  useEffect(() => {
    if (!isLoading && !error && data) {
      setArrayOfTexts(data);
    } else if (isLoading) {
      setText('Loading awesome text. Please wait.')
    } else if (error) {
      console.error('error', error)
    }
  }, [data, isLoading, error]);

  useEffect(() => {
    if (arrayOfTexts && arrayOfTexts.length) {
      setText(arrayOfTexts.pop().trim())
    }
  }, [arrayOfTexts])

  useEffect(() => {
    setTextWithProps(text?.split('').map((el, index) => ({ text: el, current: index ? false : true, className: 'orig' })))
  }, [text])

  const keyPressHandler = ({ key }) => {
    if (!isLoading && !error) {
      if (!done && typedTexts.length < textWithProps.length-1) {
        setTypedTexts([...typedTexts, key])
      } else {
        setDone(true)
      }
    }
  };

  const keyDownHandler = ({ key }) => {
    if (!isLoading && !error) {
      if (!done && key === 'Backspace') {
          typedTexts.pop()
          setTypedTexts([...typedTexts])
      }
    }
  };

  //set letters class whether correct or wrong
  useEffect(() => {
    textWithProps?.forEach((el, index) => {
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

  const buttonRef = useRef()

  const onClickHandler = () => {
    setTypedTexts([])
    setDone(false);
    setSecondsLapsed(0);
  }

  const onFocusHandler = () => {
    buttonRef.current.blur()
  }

  return (
    <div className='type-box'>
      <div className='type-container'>
        <div className='type-input p-5 flex-wrap'>
          {isLoading && <span className="primary">{text}</span>}
            {!isLoading && textWithProps?.map((el, index) => (
                <StyledSpan current={el.current} className={el.className} key={index}>{el.text}</StyledSpan>
            ))}
        </div>
      </div>
      <div className='d-flex justify-content-center'>
        <Button ref={buttonRef} variant='dark' onClick={onClickHandler} onFocus={onFocusHandler}>
          <FontAwesomeIcon icon={faRedo} />
        </Button>
      </div>
    </div>
  )
}

export { TypeBox }