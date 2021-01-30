
import React, { useContext, useEffect, useState } from "react";
import { TypingContext } from "../context/typing-context";
import { useEventListener } from "../hooks/useEventListener";
import styled from 'styled-components'
import { TypeBox } from "../components/TypeBox";

const TypingTrainer = props => {
  useEffect(() => {
      console.log('Rendered')
  })

  return (
    <div className='typing-trainer p-5'>
      <TypeBox/>
    </div>
  )
}

export { TypingTrainer }