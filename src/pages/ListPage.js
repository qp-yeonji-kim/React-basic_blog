import axios from 'axios';
import { useState, useEffect } from 'react';
import Card from '../components/Card';
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router';
import LoadingSpinner from "../components/LoadingSpinner";

const ListPage = () => {
  const history = useHistory();
  const [posts, setPosts] = useState([]);
  // 1. 처음엔 loading이 true였다가 false로 바뀌게끔 할 것임.
  const [loading, setLoading] = useState(true);

  const getPosts = () => {
    axios.get('http://localhost:3001/posts').then((res) => {
      setPosts(res.data);
      // 2. 데이터 받아오면 loading false로
      setLoading(false);
    })
  }

  const deleteBlog = (e, id) => {
    e.stopPropagation();
    axios.delete(`http://localhost:3001/posts/${id}`).then(() => {
      setPosts(prevPosts => prevPosts.filter(post =>  post.id !== id));
    });
  }

  useEffect(() => {
    getPosts();
  }, []);

  const renderBlogList = () => {
    if (loading) {
      return (
        <LoadingSpinner />
      )
    }

    if (posts.length === 0) {
      return (<div>No blog posts found</div>)
    }

    return posts.map(post => {
      return (
        <Card
          key={post.id}
          title={post.title}
          onClick={() => history.push(`/blogs/${post.id}`)}>
          <div>
            <button
              className="btn btn-danger btn-sm"
              onClick={(e) => deleteBlog(e, post.id)}
            >
              Delete
            </button>
          </div>
        </Card>
      )
    })
  }

  return (
    <div>
      <div className="d-flex justify-content-between">
        <h1>Blogs</h1>
        <div>
          <Link to="/blogs/create" className="btn btn-success">
            Create New
          </Link>
        </div>
      </div>
      {renderBlogList()}
    </div>
  );
};

export default ListPage;