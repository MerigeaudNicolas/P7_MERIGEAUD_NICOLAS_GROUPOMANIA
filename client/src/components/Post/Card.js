import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { dateParser, isEmpty } from "../Utils";
import FollowHandler from '../Profil/FollowHandler';
import LikeButton from "./LikeButton";
import { updatePost } from "../../actions/post.actions";
import DeleteCard from "./DeleteCard";
import CardComments from "./CardComments";




const Card = ({ post }) => {
    const [isLoading, setIsLoading] = useState(true);
    const [isUpdated, setIsUpdated] = useState(false);
    const [textUpdate, setTextUpdate] = useState(null);
    const [showComments, setShowComments] = useState(false);
    const usersData = useSelector((state) => state.usersReducer);
    const userData = useSelector((state) => state.userReducer);
    const dispatch = useDispatch();

    const updateItem = () => {
        if (textUpdate) {
            dispatch(updatePost(post._id, textUpdate));
        }
        setIsUpdated(false);
    };

    useEffect(() => {
        !isEmpty(usersData[0]) && setIsLoading(false);
    }, [usersData])


    return (
        <li className="card-container" key={post._id}>
            <div className="card-left">
                <img src={
                    /*!isEmpty(usersData[0]) && usersData.map((user) => {
                        if (user._id === post.posterId) return user.picture
                        else return null
                    }).join('')*/post.uPicture
                }
                    alt="image profil" />
            </div>
            <div className="card-right">
                <div className="card-header">
                    <div className="pseudo">
                        <h3>
                            {post.pseudo}
                            {
                                /*!isEmpty(usersData[0]) && usersData.map((user) => {
                                    if (user._id === post.posterId) return user.pseudo
                                    else return null
                                }).join("")*/
                            }
                        </h3>
                        {post.posterId !== userData._id && (
                            <FollowHandler idToFollow={post.posterID} type={'card'} />
                        )}
                    </div>
                    <span>{dateParser(post.createdAt)}</span>
                </div>
                {isUpdated === false && <p>{post.message}</p>}
                {isUpdated && (
                    <div className="update-post">
                        <textarea defaultValue={post.message}
                            onChange={(e) => setTextUpdate(e.target.value)}
                        />
                        <div className="button-container">
                            <button className="btn" onClick={updateItem}>
                                Valider  la modification
                            </button>
                        </div>
                    </div>
                )}
                {post.pPicture != "" && (
                    <img src={post.pPicture} alt='image de post' className="card-pic" />
                )}
                {post.video && (
                    <iframe
                        width="500"
                        height="300"
                        src={post.video}
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        title={post._id}
                    ></iframe>
                )}
                {userData._id === post.posterId && (
                    <div className="button-container">
                        <div onClick={() => setIsUpdated(!isUpdated)}>
                            <img src="./img/icons/edit.svg" a alt="edit" />
                        </div>
                        <DeleteCard id={post._id} />
                    </div>
                )}
                <div className="card-footer">
                    <div className="comment-icon">
                        <img onClick={() => setShowComments(!showComments)} src="./img/icons/message1.svg" alt="commentaire" />
                        <span>{post.nb}</span>
                    </div>
                    <img src="./img/icons/heart.svg" alt="like" />
                    <img src="./img/icons/share.svg" alt="share" />
                </div>
                {showComments/* && <CardComments post={post} />*/}
            </div>
        </li>
    );
};

export default Card;