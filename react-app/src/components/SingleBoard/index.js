import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { thunkGetSingleBoard } from '../../store/board';
import { useParams } from 'react-router-dom';


function SingleBoard() {
  const dispatch = useDispatch();
  const { boardId } = useParams();
  const currentBoard = useSelector((state) => state.boards.currentBoard.currentBoard);

  useEffect(() => {

    dispatch(thunkGetSingleBoard(boardId));

  }, [dispatch, boardId]);


//   console.log('SINGLE BOARD', currentBoard.currentBoard)

  if (!currentBoard) {
    return 'Loading...';
  }

  return (
    <div>
      <h1>{currentBoard.title}</h1>
      <>Hello</>
      <p>{currentBoard.description}</p>
      {currentBoard.pins.map((pin) => (
        <div key={pin.id}>
          <img src={pin.image_url} alt={pin.title} />
          <h2>{pin.title}</h2>
        </div>
      ))}
    </div>
  );
}

export default SingleBoard;
