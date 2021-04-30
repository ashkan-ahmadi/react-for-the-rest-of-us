import axios from 'axios'
import React, { useState } from 'react'
import Page from './Page'
import { withRouter } from 'react-router-dom'

const CreatePost = (props) => {

  const [title, setTitle] = useState()
  const [body, setBody] = useState()

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const response = await axios.post('/create-post', {
        title,
        body,
        token: localStorage.getItem('complexappToken')
      })
      console.log('New post created', response)
      // redirect to new URL: https://www.udemy.com/course/react-for-the-rest-of-us/learn/lecture/18282394
      props.addFlashMessage('Congrats! You have successfully added a post.')
      props.history.push(`/post/${response.data}`)
    } catch (error) {
      console.error('There was a problem', error)
    }
  }

  return (
    <Page title="Create New Post">
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="post-title" className="text-muted mb-1">
            <small>Title</small>
          </label>
          <input onChange={e => setTitle(e.target.value)} autoFocus={true} name="title" id="post-title" className="form-control form-control-lg form-control-title" type="text" placeholder="" autoComplete="off" />
        </div>

        <div className="form-group">
          <label htmlFor="post-body" className="text-muted mb-1 d-block">
            <small>Body Content</small>
          </label>
          <textarea onChange={e => setBody(e.target.value)} name="body" id="post-body" className="body-content tall-textarea form-control" type="text"></textarea>
        </div>

        <button className="btn btn-primary">Save New Post</button>
      </form>
    </Page>
  )
}

export default withRouter(CreatePost)
