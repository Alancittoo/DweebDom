import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { thunkGetSingleBoard, thunkDeleteBoard, thunkUpdateBoard, thunkDeletePinFromBoard } from '../../store/board';
import { useParams, NavLink, useHistory } from 'react-router-dom';
import './SingleBoard.css'


function SingleBoard() {
  const dispatch = useDispatch();
  const { boardId, pinId } = useParams();
  const history = useHistory();
  const currentBoard = useSelector((state) => state.boards.currentBoard.currentBoard);
  const currentUser = useSelector(state => state.session.user);
  const [errors, setErrors] = useState([])

  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    dispatch(thunkGetSingleBoard(boardId));
  }, [dispatch, boardId]);


  useEffect(() => {
    if (currentBoard) {
      setTitle(currentBoard.title);
      setDescription(currentBoard.description);
    }
  }, [currentBoard]);
  //   console.log('SINGLE BOARD', currentBoard.currentBoard)

  const handleDelete = () => {
    dispatch(thunkDeleteBoard(boardId));
    history.push('/home')
  }

  const handleDeletePinFromBoard = async (pinId) => {
    // e.preventDefault();
    const res = await dispatch(thunkDeletePinFromBoard(boardId, pinId))
    if (res) {
      console.log('Pin removed')
    } else {
      console.log('Failed to remove pin')
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    let newErrors = []

    if (title === "") newErrors.push('title cannot be empty')
    if (newErrors.length > 0) {
      setErrors(newErrors);
      return;
  }

    const board = { title, description }
    const res = await dispatch(thunkUpdateBoard(board, boardId));

    if (res){
      setErrors([])
      dispatch(thunkGetSingleBoard(boardId))
    }

    setIsEditing(false);
    // history.push(`/boards/${boardId}`)
  }

  if (!currentBoard) {
    return 'Loading...';
  }

  return (
    <div className="SingleBoard-container">
      {isEditing ? (
        <form onSubmit={handleSubmit}>
          <label style={{marginRight: '15px', marginLeft:'10px', animation: 'glow 2s ease-in-out infinite', color:'white'}}>
            Title:
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              style={{margin:'5px', marginTop: '35px', marginLeft:'10px', borderRadius:'4px'}}
            />
          </label>
          <label style={{animation: 'glow 2s ease-in-out infinite', color:'white'}}>
            Description:
            <input
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              style={{margin:'5px', marginTop: '35px', marginLeft:'10px', borderRadius:'4px'}}
            />
          </label>
          <button className='Update-board-button' type="submit">Submit</button>
          {errors.map((error, idx) => (
                  <div style={{ color: 'red' }}>{error}</div>
                ))}
        </form>
      ) : (
        <div className='board-info'>
          <h1>{currentBoard.title}</h1>
          <p>{currentBoard.description}</p>
          {currentUser.id === currentBoard.user_id && (
            <>
              <button onClick={handleDelete}>Delete</button>
              <button onClick={() => setIsEditing(true)}>Update</button>
            </>
          )}
        </div>
      )}
      <div className="SingleBoard-image-container">
        {currentBoard.pins?.map((pin) => (
          <div key={pin.id} className="SingleBoard-pin-container">
            <NavLink to={`/pins/${pin.id}`}>
              <img className='SingleBoard-pin-image' src={pin.image_url} alt={pin.title} />
            </NavLink>
            {currentUser.id == currentBoard.user_id && (
              <p className='DeletePinFromBoardButton' onClick={() => handleDeletePinFromBoard(pin.id)}><i style={{color:'white'}} class="fa-solid fa-trash-can"></i></p>
            )}
          </div>

        ))}

      </div>
    </div>
  );
}

export default SingleBoard;
