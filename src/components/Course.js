import React from 'react'
import { baseUrl } from '../api/url';

const Course = ({ course, refreshCourses, id }) => {
    const markCoursePurchased = async () => {
        const data = {
            fields: {
                ...course,
                purchased: true
            },
            typecast: true
        };
        try {
            await fetch(`${baseUrl}/${id}`, {
                method: 'PUT',
                body: JSON.stringify(data),
            });
            refreshCourses();
        } catch (err) {
            console.error(err);
        }
    };

    const deleteCourse = async () => {
        try {
            await fetch(`${baseUrl}/${id}`, {
                method: 'DELETE',
            });
            refreshCourses();
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div className="list-group-item">
            <a href={course.link}>
                <h4 className="list-group-item-heading">{course.name}</h4>
            </a>
            <p>
                Tags:{' '}
                {course.tags && course.tags.map((tag, index) => (
                    <span className="badge badge-primary mr-2" key={index}>{tag}</span>
                ))}
            </p>
            {!course.purchased && (
                <button className="btn btn-sm btn-primary" onClick={markCoursePurchased}>Purchased</button>
            )}
            <button className="btn btn-sm btn-danger ml-2" onClick={deleteCourse}>Delete</button>
        </div>
    )
}
export default Course
