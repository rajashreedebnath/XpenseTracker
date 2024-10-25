import React from "react"
import { Link } from "react-router-dom"

export default function ErrorPage() {
    return (
        <div className="error-page">
            <h1>Oops! you are in the wrong page</h1>
            <Link to={"/"}>
                <button>Home Page</button>
            </Link>
        </div>
    )
}