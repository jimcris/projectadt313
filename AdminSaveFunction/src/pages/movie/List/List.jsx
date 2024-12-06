import { useNavigate } from 'react-router-dom';
import { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import './List.css';

const Lists = () => {
  const navigate = useNavigate();
  const accessToken = localStorage.getItem('accessToken');
  const [lists, setLists] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const API_URL = process.env.REACT_APP_API_URL || ''; // Use environment variable for the base URL

  const getMovies = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(`${API_URL}/movies`);
      setLists(response.data);
    } catch (err) {
      setError('Failed to fetch movies. Please try again.');
      console.error("Error fetching movies:", err);
    } finally {
      setLoading(false);
    }
  }, [API_URL]);

  useEffect(() => {
    getMovies();
  }, [getMovies]);

  const handleDelete = async (id) => {
    const confirmationMessage = 'Are you sure you want to delete this movie?';
    if (window.confirm(confirmationMessage)) {
      try {
        await axios.delete(`${API_URL}/movies/${id}`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
        setLists((prevLists) => prevLists.filter((movie) => movie.id !== id));
      } catch (err) {
        alert('Failed to delete movie. Please try again.');
        console.error("Error deleting movie:", err);
      }
    }
  };

  return (
    <div className="lists-container">
      <div className="create-container">
        <button
          className="create"
          type="button"
          onClick={() => navigate('/main/movies/form')}
          aria-label="Create a new movie"
        >
          Create New
        </button>
      </div>
      <div className="table-container">
        {loading ? (
          <p>Loading movies...</p>
        ) : error ? (
          <p className="error">{error}</p>
        ) : lists.length === 0 ? (
          <p>No movies found.</p>
        ) : (
          <table className="movie-lists">
            <thead>
              <tr>
                <th>ID</th>
                <th>Title</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {lists.map((movie) => (
                <tr key={movie.id}>
                  <td>{movie.id}</td>
                  <td className="title-cell">{movie.title}</td>
                  <td>
                    <button
                      className="edit"
                      type="button"
                      onClick={() => navigate(`/main/movies/form/${movie.id}`)}
                      aria-label={`Edit movie ${movie.title}`}
                    >
                      Edit
                    </button>
                    <button
                      className="delete"
                      type="button"
                      onClick={() => handleDelete(movie.id)}
                      aria-label={`Delete movie ${movie.title}`}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default Lists;
