import React, { SyntheticEvent, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { selectAllUsers } from '../../redux/reducers/users/userSlice';
import { addNewPost, postAdded } from '../../redux/reducers/post/postSlice';
import { useNavigate } from 'react-router-dom';
import shortid from "shortid"

const AddPost: React.FC = () => {
  const users = useAppSelector(selectAllUsers);
  const dispatch = useAppDispatch();
  const [addRequestStatus, setAddRequestStatus] = useState('idle');
  const navigate = useNavigate();

  const addPost = (e: SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = e.target as HTMLFormElement;

    const title: string = form["postTitle"].value;
    const userId = +form["author"].value;
    const content: string = form["postContent"].value;

    const check = [title, content, userId].every(Boolean) && addRequestStatus === "idle"

    if (check) {
      try {
        setAddRequestStatus("pending");
        dispatch(addNewPost({ title, body: content, userId })).unwrap();
        form["postTitle"].value = "";
        form["author"].value = "";
        form["postContent"].value = "";
        navigate("/");
      } catch (error) {
        console.error('Failed to add the post', error)
      } finally {
        setAddRequestStatus("idle");
      }
    }

  }

  return (
    <>
      <div className="lg:flex-[0_0_40%] mt-10 sm:mt-0 px-10 py-4">
        <div className="md:grid md:grid-cols-1 md:gap-6">
          <div className="md:col-span-1">
            <div className="px-4 sm:px-0">
              <h3 className="text-lg font-medium leading-6 text-gray-900">Add Post Form</h3>
            </div>
          </div>
          <div className="mt-5 md:mt-0 md:col-span-2">
            <form action="#" onSubmit={addPost}>
              <div className="shadow overflow-hidden sm:rounded-md">
                <div className="px-4 py-5 bg-white sm:p-6">
                  <div className="grid grid-cols-1 gap-6">

                    <div className="col-span-3 sm:col-span-1">
                      <label htmlFor="city" className="block text-sm font-medium text-gray-700">
                        Post Title:
                      </label>
                      <input
                        type="text"
                        name="postTitle"
                        id="postTitle"
                        required
                        className="mt-1 block w-1/2 py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-[#FFC017] sm:text-sm"
                      />
                    </div>

                    <div className="col-span-3 sm:col-span-1">
                      <label htmlFor="country" className="block text-sm font-medium text-gray-700">
                        Author:
                      </label>
                      <select
                        id="author"
                        name="author"
                        autoComplete="author-name"
                        required
                        className="mt-1 block w-1/2 py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-[#FFC017] sm:text-sm"
                      >
                        <option value={""}></option>
                        {
                          users?.map((user) => (
                            <option key={user.id} value={user.id}>{user.name}</option>
                          ))
                        }
                      </select>
                    </div>

                    <div className="col-span-3 sm:col-span-1">
                      <label htmlFor="city" className="block text-sm font-medium text-gray-700">
                        Post Content:
                      </label>
                      <textarea
                        name="postContent"
                        id="postContent"
                        required
                        className="mt-1 block w-1/2 py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-[#FFC017] sm:text-sm"
                      />
                    </div>

                  </div>
                </div>
                <div className="px-4 py-3 bg-gray-50 text-left sm:px-6">
                  <button
                    type="submit"
                    className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-[rgba(25,25,25,1)] hover:bg-[#000] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    Create Post
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  )
}

export default AddPost;