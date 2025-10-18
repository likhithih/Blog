import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { toast } from 'react-toastify';

function BlogPost() {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [commentLoading, setCommentLoading] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [likeLoading, setLikeLoading] = useState(false);

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    setCommentLoading(true);
    try {
      const response = await axios.post('http://localhost:4000/comments', {
        content: newComment,
        blogId: id
      });
      setComments(prev => [response.data.comment, ...prev]);
      setNewComment('');
      toast.success('Comment added successfully!');
    } catch (error) {
      console.error('Error adding comment:', error);
      toast.error('Failed to add comment');
    } finally {
      setCommentLoading(false);
    }
  };

  const handleLikeToggle = async () => {
    setLikeLoading(true);
    try {
      const response = await axios.post(`http://localhost:4000/blogs/${id}/like`);
      setIsLiked(response.data.isLiked);
      setBlog(prev => ({
        ...prev,
        likes: response.data.likes
      }));
      toast.success(response.data.isLiked ? 'Blog liked!' : 'Blog unliked!');
    } catch (error) {
      console.error('Error toggling like:', error);
      toast.error('Failed to toggle like');
    } finally {
      setLikeLoading(false);
    }
  };

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const response = await axios.get(`http://localhost:4000/blogs/${id}`);
        setBlog(response.data);
      } catch (error) {
        console.error('Error fetching blog:', error);
      } finally {
        setLoading(false);
      }
    };

    const fetchComments = async () => {
      try {
        const response = await axios.get(`http://localhost:4000/comments/${id}`);
        setComments(response.data);
      } catch (error) {
        console.error('Error fetching comments:', error);
      }
    };

    fetchBlog();
    fetchComments();
  }, [id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!blog) {
    return <div>Blog not found</div>;
  }

  return (
    <div>
      <div className="max-w-screen-xl mx-auto p-5 sm:p-8 md:p-12 relative">
        <div
          className="bg-cover h-64 text-center overflow-hidden"
          style={{
            height: "450px",
            backgroundImage: `url(${blog.image || "https://api.time.com/wp-content/uploads/2020/07/never-trumpers-2020-election-01.jpg?quality=85&w=1201&h=676&crop=1"})`,
          }}
        ></div>

        <div className="max-w-2xl mx-auto">
          <div className="mt-3 bg-white rounded-b lg:rounded-b-none lg:rounded-r flex flex-col justify-between leading-normal">
            <div>
              <div className="mb-2">
                <a
                  href="#"
                  className="text-xs text-indigo-600 uppercase font-medium hover:text-gray-900 transition duration-500 ease-in-out"
                >
                  {blog.category}
                </a>
              </div>

              <h1 className="text-gray-900 font-bold text-3xl mb-2">
                {blog.title}
              </h1>

              <p className="text-gray-700 text-xs mt-2">
                Written By:{" "}
                <a
                  href="#"
                  className="text-indigo-600 font-medium hover:text-gray-900 transition duration-500 ease-in-out"
                >
                  {blog.author?.name || 'Anonymous'}
                </a>
              </p>

              <div className="text-base leading-8 my-5" dangerouslySetInnerHTML={{ __html: blog.description }} />

              <div className="flex flex-wrap gap-2">
                {[blog.category].map((tag) => (
                  <a
                    key={tag}
                    href="#"
                    className="text-xs text-indigo-600 font-medium hover:text-gray-900 transition duration-500 ease-in-out"
                  >
                    #{tag}
                  </a>
                ))}
              </div>


            </div>
          </div>
        </div>
      </div>

      {/* Comments Section */}
      <div className="max-w-4xl mx-auto mt-12 px-4">
        <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
              <span className="text-indigo-600">💬</span>
              Comments ({comments.length})
            </h2>
          </div>

          {/* Add Comment Form */}
          <form onSubmit={handleCommentSubmit} className="mb-10">
            <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
              <div className="flex gap-4 items-end">
                <div className="flex-1">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Share your thoughts
                  </label>
                  <textarea
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    placeholder="Write a thoughtful comment..."
                    className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent resize-none transition-all duration-200"
                    rows="4"
                    required
                  />
                </div>
                <button
                  type="submit"
                  disabled={commentLoading}
                  className="px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg hover:from-indigo-700 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 font-medium shadow-md hover:shadow-lg"
                >
                  {commentLoading ? (
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      Posting...
                    </div>
                  ) : (
                    'Post Comment'
                  )}
                </button>
              </div>
            </div>
          </form>

          {/* Comments List */}
          <div className="space-y-6">
            {comments.length === 0 ? (
              <div className="text-center py-12">
                <div className="text-6xl mb-4">💭</div>
                <p className="text-gray-500 text-lg">No comments yet. Be the first to share your thoughts!</p>
              </div>
            ) : (
              comments.map((comment) => (
                <div key={comment._id} className="bg-gradient-to-r from-gray-50 to-white p-6 rounded-xl border border-gray-200 hover:shadow-md transition-all duration-200">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-md">
                      {comment.author?.name?.charAt(0)?.toUpperCase() || 'A'}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-3">
                        <p className="font-semibold text-gray-900 text-lg">
                          {comment.author?.name || 'Anonymous'}
                        </p>
                        <span className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
                          {new Date(comment.createdAt).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'short',
                            day: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit'
                          })}
                        </span>
                      </div>
                      <div className="bg-white p-4 rounded-lg border border-gray-100 shadow-sm">
                        <p className="text-gray-800 leading-relaxed">{comment.content}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default BlogPost;
