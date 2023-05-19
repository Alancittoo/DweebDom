import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { thunkGetBoards } from '../../store/board';

function AllBoards() {
    const dispatch = useDispatch();
    console.log(useSelector(state => state))
    const boards = useSelector(state => state.boards.allBoards);
    const currentUser = useSelector(state => state.session.user);

    useEffect(() => {
        dispatch(thunkGetBoards(currentUser.id));
    }, [dispatch, currentUser.id]);

    return (
        <div>
            {Object.values(boards).map(board => (
                <div key={board.id}>
                    <h2>{board.title}</h2>
                    <h2>HELLO</h2>
                    <p>{board.description}</p>
                </div>
            ))}
        </div>
    );
}

export default AllBoards;
