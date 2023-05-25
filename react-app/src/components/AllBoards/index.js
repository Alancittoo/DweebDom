import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { thunkGetBoards, thunkCreateBoard } from '../../store/board';
import { NavLink } from 'react-router-dom';
import './AllBoards.css'

function AllBoards() {
    const dispatch = useDispatch()
    console.log(useSelector(state => state))
    const boards = useSelector(state => state.boards.allBoards)
    const currentUser = useSelector(state => state.session.user)
    const [boardTitle, setBoardTitle] = useState("")
    const [boardDescription, setBoardDescription] = useState("")
    const [showForm, setShowForm] = useState(false)
    const [errors, setErrors] = useState([]);

    // console.log(boards)
    useEffect(() => {
        dispatch(thunkGetBoards(currentUser.id))
    }, [dispatch, currentUser.id]);


    const handleCreateBoard = async (e) => {
        e.preventDefault();
        let newErrors = []

        if (boardTitle === "") newErrors.push('title cannot be empty')
        if (boardTitle.length > 50) newErrors.push('title is WAY too long, think of something smaller')
        if (newErrors.length > 0) {
            setErrors(newErrors)
            return;
        }

        const board = new FormData()
        board.append("title", boardTitle)
        board.append("description", boardDescription)
        board.append("user_id", currentUser.id)

        await dispatch(thunkCreateBoard(board))
        setBoardTitle("")
        setBoardDescription("")
        dispatch(thunkGetBoards(currentUser.id))
        setShowForm(false)
    }

    // add VALIDATIONS LATER WORK ON FUNCTIONALITY NOW
    return (
        <div>
            {Object.values(boards).map(board => (
                <div key={board.id}>
                <NavLink to={`/boards/single/${board.id}`}>
                    <h2>{board.title}</h2>
                    <p>{board.description}</p>
                </NavLink>
                </div>
            ))}
            <button className='Create-new-board-button' onClick={() => setShowForm(!showForm)}>Create New Board</button>
            {showForm && (
                <form className='Create-board-form' onSubmit={handleCreateBoard}>
                    <input
                        type="text"
                        value={boardTitle}
                        onChange={(e) => setBoardTitle(e.target.value)}
                        placeholder="Enter Board Title"
                    />
                    {errors.boardTitle}
                    <textarea
                        value={boardDescription}
                        onChange={(e) => setBoardDescription(e.target.value)}
                        placeholder="Enter Board Description"
                    />
                    <button className='Create-new-board-button'type="submit">Create Board</button>
                    {errors.map((error) => (
                                    <div style={{ color: 'red' }}>{error}</div>
                                ))}
                </form>
            )}
        </div>
    );
}

export default AllBoards;
