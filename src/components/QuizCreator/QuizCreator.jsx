import React, { useState, useEffect } from 'react'
import style from './QuizCreator.module.scss'
import Input from '../Input/Input'
import Button from '../Button/Button'
import Select from '../Select/Select'
import Popup from './Popup/Popup'
import { useCreator } from '../../context/Creator/CreatorContext'
import { useNavigate } from 'react-router-dom'

function QuizCreator() {

    const { correctAnswerId, updateCorrectAnswerId, currentQuestionId,
        updateCurrentQuestionId, options, updateOptions, question, updateQuestion,
        validation, isValid, clearFields, questionsList, addQuestion} = useCreator()

    const [isModalOpen, setIsModalOpen] = useState(false)

    const navigate = useNavigate()

    const togglePopup = () => {

        setIsModalOpen(!isModalOpen)
    }

    function selectChangeHandler(event) {

        let correctAnswerId = translateLetterToId(event.target.value)

        updateCorrectAnswerId(correctAnswerId)
    }

    function translateIdToLetter(id) {

        let translator = { 1: 'A', 2: 'B', 3: 'C', 4: 'D' }

        return translator[id]
    }

    function translateLetterToId(letter) {

        let translator = { 'A': 1, 'B': 2, 'C': 3, 'D': 4 }

        return translator[letter]
    }

    function optionInputChangeHandler(id, value) {

        const newOptions = [...options]

        newOptions.forEach(option => {

            if (option.id === id)
                option.answer = value

        })

        updateOptions(newOptions)
    }

    function questionInputChangeHandler(value) {

        updateQuestion(value)
    }

    function addQuestionButtonClickHandler() {

        if ( questionsList.find(question => question.id === currentQuestionId) )  {
            return
        }
            

        addQuestion({
            id: currentQuestionId,
            question,
            options,
            correctAnswerId,
        })

        clearFields()

        updateCurrentQuestionId(currentQuestionId + 1)
    }

    useEffect(() => {

        validation()

    }, [question, options])

    useEffect(() => {

        clearFields()
        
    }, [])

    return (
        <div className={style.QuizCreator}>

            { isModalOpen && <Popup handleClose = {togglePopup} /> }

            <div className={style.Form}>

                <span 
                    className={style.CloseIcon} 
                    onClick={() => navigate('/')}
                > 
                    x 
                </span>

                <div className={style.Header}>

                    <h2 className={style.Title}> Creation of Quiz </h2>

                </div>

                <div className={style.Fields}>

                    <Input
                        label='Enter question'
                        value={question}
                        onChange={event => questionInputChangeHandler(event.target.value)}
                    />

                    <hr className={style.Line} />

                    <Input
                        label='Option А'
                        value={options.find(option => option.id === 1).answer}
                        onChange={event => optionInputChangeHandler(1, event.target.value)}
                    />

                    <Input
                        label='Option B'
                        value={options.find(option => option.id === 2).answer}
                        onChange={event => optionInputChangeHandler(2, event.target.value)}
                    />

                    <Input
                        label='Option C'
                        value={options.find(option => option.id === 3).answer}
                        onChange={event => optionInputChangeHandler(3, event.target.value)}
                    />

                    <Input
                        label='Option D'
                        value={options.find(option => option.id === 4).answer}
                        onChange={event => optionInputChangeHandler(4, event.target.value)}
                    />

                    <Select
                        label='Select the correct answer'
                        value={translateIdToLetter(correctAnswerId)}
                        onChange={selectChangeHandler}
                        options={[
                            { text: 'A', value: 'A' },
                            { text: 'B', value: 'B' },
                            { text: 'C', value: 'C' },
                            { text: 'D', value: 'D' }
                        ]}
                    />

                    <div className={style.Buttons}>

                        <Button
                            isActive={isValid}
                            color={'Blue'}
                            onClick={addQuestionButtonClickHandler}
                        >
                            Add Question
                        </Button>

                        <Button
                            isActive={questionsList.length >= 2 || (questionsList.length === 1 && isValid)}
                            color={'Purple'}
                            onClick={togglePopup}
                        >
                            Create Quiz
                        </Button>

                    </div>

                </div>

            </div>

        </div>
    )

}

export default QuizCreator