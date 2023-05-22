import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { thunkGetBoards, thunkCreateBoard } from '../../store/board';
import { NavLink } from 'react-router-dom';

function AllBoards() {
    const dispatch = useDispatch()
    console.log(useSelector(state => state))
    const boards = useSelector(state => state.boards.allBoards)
    const currentUser = useSelector(state => state.session.user)
    const [boardTitle, setBoardTitle] = useState("")
    const [boardDescription, setBoardDescription] = useState("")
    const [showForm, setShowForm] = useState(false)
    // console.log(boards)
    useEffect(() => {
        dispatch(thunkGetBoards(currentUser.id));
    }, [dispatch, currentUser.id]);


    const handleCreateBoard = async (e) => {
        e.preventDefault();
        const board = new FormData();
        board.append("title", boardTitle);
        board.append("description", boardDescription);
        board.append("user_id", currentUser.id);

        await dispatch(thunkCreateBoard(board));
        setBoardTitle("");
        setBoardDescription("");
        dispatch(thunkGetBoards(currentUser.id));
        setShowForm(false);
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
            <button onClick={() => setShowForm(!showForm)}>Create New Board</button>
            {showForm && (   // Show form only if showForm is true
                <form onSubmit={handleCreateBoard}>
                    <input
                        type="text"
                        value={boardTitle}
                        onChange={(e) => setBoardTitle(e.target.value)}
                        placeholder="Enter Board Title"
                    />
                    <textarea
                        value={boardDescription}
                        onChange={(e) => setBoardDescription(e.target.value)}
                        placeholder="Enter Board Description"
                    />
                    <button type="submit">Create Board</button>
                </form>
            )}
        </div>
    );
}

export default AllBoards;
