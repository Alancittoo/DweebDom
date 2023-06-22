import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { thunkGetBoards, thunkCreateBoard } from '../../store/board';
import { NavLink } from 'react-router-dom';

function UserBoards() {
    const dispatch = useDispatch()
    // console.log(useSelector(state => state))
    const boards = useSelector(state => state.boards.allBoards)
    const currentUser = useSelector(state => state.session.user)
    const [boardTitle, setBoardTitle] = useState("")
    const [boardDescription, setBoardDescription] = useState("")
    const [showForm, setShowForm] = useState(false)
    const [errors, setErrors] = useState([]);
    const profileUser = useSelector(state => state.session.profileUser);


    // console.log(boards)
    useEffect(() => {
        dispatch(thunkGetBoards(profileUser.id))
    }, [dispatch, profileUser.id]);


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
        board.append("user_id", profileUser.id)

        await dispatch(thunkCreateBoard(board))
        setBoardTitle("")
        setBoardDescription("")
        dispatch(thunkGetBoards(profileUser.id))
        setShowForm(false)
    }

    // add VALIDATIONS LATER WORK ON FUNCTIONALITY NOW
    return (
        <div>
            {Object.values(boards).map(board => (
                <div style={{marginLeft:'35px'}} key={board.id}>
                <NavLink
                to={`/boards/single/${board.id}`}
                style={{color:'White', marginLeft:'25px'}}
                className='allBoards-details'
                >
                    <h2>{board.title}</h2>
                    <p>{board.description}</p>
                </NavLink>
                </div>
            ))}
            <button style={{marginLeft:'35px'}} className='Create-new-board-button' onClick={() => setShowForm(!showForm)}>Create New Board</button>
            {showForm && (
                <form style={{marginLeft:'30px', marginTop:'20px'}} className='Create-board-form' onSubmit={handleCreateBoard}>
                    <input
                        type="text"
                        value={boardTitle}
                        onChange={(e) => setBoardTitle(e.target.value)}
                        placeholder="Enter Board Title"
                        style={{borderRadius:'5px'}}
                    />
                    {errors.boardTitle}
                    <textarea
                        value={boardDescription}
                        onChange={(e) => setBoardDescription(e.target.value)}
                        placeholder="Enter Board Description"
                        style={{borderRadius:'10px'}}
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

export default UserBoards;
