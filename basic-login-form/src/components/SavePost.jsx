import React from "react";
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import savePosts from '../actions/savePosts';
import { TextField, Button } from "@material-ui/core";

const PostComponent = ({ savePosts, posts }) => {
    const [title, setTitle] = React.useState('');
    const [content, setContent] = React.useState('');
    const [author, setAuthor] = React.useState('');

    const onFormSubmit = () => {
        const data = [...posts, {title, content, author}];
        savePosts(data);
    }

    const inputOnchange = ({ target: {
        id: fieldId,
        value: fieldValue,
    } }) => {
        if (fieldId === 'title') {
            setTitle(fieldValue);
        }

        if (fieldId === 'content') {
            setContent(fieldValue);
        }

        if (fieldId === 'author') {
            setAuthor(fieldValue);
        }
    }

    return (
        <div className="w-25 pt-3">
            <div className="mb-3">
                <label htmlFor="title" className="form-label" > Title </label >
                <TextField
                    type="text"
                    required
                    className="form-control"
                    id="title"
                    aria-describedby="title"
                    onChange={inputOnchange}
                />
            </div >
            <div className="mb-3">
                <label htmlFor="content" className="form-label">Content</label>
                <TextField
                    type="text"
                    required
                    className="form-control"
                    id="content"
                    onChange={inputOnchange}
                />
            </div>
            <div className="mb-3">
                <label htmlFor="author" className="form-label">Author</label>
                <TextField
                    type="text"
                    className="form-control"
                    id="author"
                    onChange={inputOnchange}
                />
            </div>
            <Button type="submit" 
                color="primary"
                variant="contained"
                className="btn btn-primary" data-testid='postFormBtn' onClick={onFormSubmit}>Submit</Button>
        </div >
    );
}    

PostComponent.propTypes = {
    savePosts: PropTypes.func.isRequired,
    posts: PropTypes.arrayOf(PropTypes.shape({
        title: PropTypes.string,
        content: PropTypes.string.isRequired,
        author: PropTypes.string.isRequired,
    })).isRequired,
}

const mapStateToProps = (state) => {
    return {
        posts: state.posts,
    }
};

const mapDispatchToProps = {
    savePosts,
};

export default connect(mapStateToProps, mapDispatchToProps)(PostComponent);