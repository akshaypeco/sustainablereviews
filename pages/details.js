import React from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import styles from "../styles/Details.module.css";
import Spinner from "../comps/spinner";
import axios from "axios";

const DetailsPage = () => {
  const router = useRouter();
  const { docId } = router.query;
  const [isLoading, setIsLoading] = useState(false);
  const [submission, setSubmission] = useState([]);
  const [addingComment, setAddingComment] = useState(false);
  const [comments, setComments] = useState([]);

  useEffect(() => {
    setIsLoading(true);
    const fetchData = async () => {
      const q = docId;
      const params = new URLSearchParams({ q });

      const res = await fetch("/api/getSubmission?" + params);
      const result = await res.json();

      const comms = await fetch("/api/getcomments?" + params);
      const commsResult = await comms.json();

      setTimeout(() => {
        setSubmission(result["submission"][0]);
        setComments(commsResult["comments"]);
        setIsLoading(false);
      }, 1000);
    };

    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    setIsLoading(true);
    const fetchData = async () => {
      const q = docId;
      const params = new URLSearchParams({ q });

      const comms = await fetch("/api/getcomments?" + params);
      const commsResult = await comms.json();

      setTimeout(() => {
        setComments(commsResult["comments"]);
        setAddingComment(false);
        setIsLoading(false);
      }, 1000);
    };

    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [addingComment]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData(event.target);
    const data = {};
    formData.forEach((value, key) => (data[key] = value));
    data["docId"] = docId;
    data["numComments"] = submission.numComments + 1;

    await axios
      .put("/api/addcomment", data)
      .catch((err) => {
        if (err.response) {
          // client received an error response (5xx, 4xx)
          console.log("5xx, 4xx error");
        } else if (err.request) {
          // client never received a response, or request never left
          console.log("client never received response, or request never left");
        } else {
          // anything else
          console.log("other error");
        }
      })
      .finally(setAddingComment(true));
  };

  if (submission.length == 0) {
    return (
      <div>
        <Spinner />
      </div>
    );
  } else {
    return (
      <div className={styles.container}>
        <Head>
          <title>Sustainable Reviews</title>
          <meta
            name="description"
            content="List of sustainable alternatives sourced from the community."
          />
          <link rel="icon" href="/planet-earth.png" />
        </Head>
        <main className={styles.main}>
          {isLoading ? (
            <Spinner />
          ) : (
            <div>
              {submission.type == "store" ? (
                <div className={styles.storeContainer}>
                  <h3 style={{ color: "#656565" }}>
                    STORE | {submission.upvotes} upvotes
                  </h3>
                  <h1>{submission.storename}</h1>
                  <div className={styles.productTagsContainer}>
                    {submission.kitchen ? (
                      <div className={styles.productTag}>
                        <p>Kitchen 🍽 🧽 </p>
                      </div>
                    ) : null}
                    {submission.foodBeverages ? (
                      <div className={styles.productTag}>
                        <p>Food {"&"} beverages 🍯 🥬 🍳</p>
                      </div>
                    ) : null}
                    {submission.showerBath ? (
                      <div className={styles.productTag}>
                        <p>Shower {"&"} bath 🛁 🧼 🚽</p>
                      </div>
                    ) : null}
                    {submission.laundry ? (
                      <div className={styles.productTag}>
                        <p>Laundry 🧺</p>
                      </div>
                    ) : null}
                    {submission.clothing ? (
                      <div className={styles.productTag}>
                        <p>Clothing 👗👕👒</p>
                      </div>
                    ) : null}
                    {submission.selfCare ? (
                      <div className={styles.productTag}>
                        <p>Self care 🧴</p>
                      </div>
                    ) : null}
                    {submission.bedroom ? (
                      <div className={styles.productTag}>
                        <p>Bedroom 🛏</p>
                      </div>
                    ) : null}
                    {submission.coop ? (
                      <div className={styles.productTag}>
                        <p>Co-op 🤲</p>
                      </div>
                    ) : null}
                    {submission.organic ? (
                      <div className={styles.productTag}>
                        <p>Organic 🌎</p>
                      </div>
                    ) : null}
                    {submission.carbonNeutral ? (
                      <div className={styles.productTag}>
                        <p>Carbon neutral 🍃</p>
                      </div>
                    ) : null}
                    {submission.plasticFree ? (
                      <div className={styles.productTag}>
                        <p>Plastic free ♻️</p>
                      </div>
                    ) : null}
                    {submission.living ? (
                      <div className={styles.productTag}>
                        <p>Living 🛋</p>
                      </div>
                    ) : null}
                    {submission.womanOwned ? (
                      <div className={styles.productTag}>
                        <p>Woman owned 🧘‍♀️</p>
                      </div>
                    ) : null}
                    {submission.familyOwned ? (
                      <div className={styles.productTag}>
                        <p>Family owned 👨‍👩‍👦</p>
                      </div>
                    ) : null}
                  </div>
                  <div className={styles.buyContainer}>
                    <div>
                      <a
                        href={submission.URL}
                        target="_blank"
                        rel="noreferrer"
                        className={styles.buyNowButton}
                      >
                        Visit
                      </a>
                    </div>
                  </div>
                  {submission.image_url ? (
                    <img
                      className={styles.image}
                      src={submission.image_url}
                      alt="Image describing either a store product or a DIY product."
                    />
                  ) : null}
                  <div className={styles.descriptionContainer}>
                    <h4>Description</h4>
                    <p>{submission.description}</p>
                  </div>
                  <div className={styles.commentsContainer}>
                    <h4>Comments</h4>
                    <div>
                      {comments.map((item) => (
                        <div key={item.id}>
                          <div className={styles.commentContainer}>
                            <div
                              style={{
                                display: "flex",
                                flexDirection: "row",
                                alignItems: "center",
                              }}
                            >
                              {item.username ? (
                                <h2>{item.username}</h2>
                              ) : (
                                <h2>anonymous</h2>
                              )}
                              <h3>{item.updated.slice(0, 10)}</h3>
                            </div>
                            <p>{item.comment}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                    <div>
                      <form
                        className={styles.addComment}
                        onSubmit={handleSubmit}
                      >
                        <p>Username (not required):</p>
                        <input
                          className={styles.usernameInput}
                          name="username"
                        />
                        <p>Write a comment:</p>
                        <textarea
                          className={styles.addCommentInput}
                          name="comment"
                          required
                        />
                        <button
                          type="submit"
                          className={styles.addCommentButton}
                        >
                          Post
                        </button>
                      </form>
                    </div>
                  </div>
                </div>
              ) : null}
              {submission.type == "product" ? (
                <div className={styles.storeContainer}>
                  <h3 style={{ color: "#656565" }}>
                    PRODUCT | {submission.upvotes} upvotes
                  </h3>
                  <h1>{submission.product_name}</h1>
                  <h2>Alternative to: {submission.alternative}</h2>
                  <h3>{submission.storename}</h3>
                  <div className={styles.productTagsContainer}>
                    {submission.kitchen ? (
                      <div className={styles.productTag}>
                        <p>Kitchen 🍽 🧽 </p>
                      </div>
                    ) : null}
                    {submission.foodBeverages ? (
                      <div className={styles.productTag}>
                        <p>Food {"&"} beverages 🍯 🥬 🍳</p>
                      </div>
                    ) : null}
                    {submission.showerBath ? (
                      <div className={styles.productTag}>
                        <p>Shower {"&"} bath 🛁 🧼 🚽</p>
                      </div>
                    ) : null}
                    {submission.laundry ? (
                      <div className={styles.productTag}>
                        <p>Laundry 🧺</p>
                      </div>
                    ) : null}
                    {submission.clothing ? (
                      <div className={styles.productTag}>
                        <p>Clothing 👗👕👒</p>
                      </div>
                    ) : null}
                    {submission.selfCare ? (
                      <div className={styles.productTag}>
                        <p>Self care 🧴</p>
                      </div>
                    ) : null}
                    {submission.bedroom ? (
                      <div className={styles.productTag}>
                        <p>Bedroom 🛏</p>
                      </div>
                    ) : null}
                    {submission.coop ? (
                      <div className={styles.productTag}>
                        <p>Co-op 🤲</p>
                      </div>
                    ) : null}
                    {submission.organic ? (
                      <div className={styles.productTag}>
                        <p>Organic 🌎</p>
                      </div>
                    ) : null}
                    {submission.carbonNeutral ? (
                      <div className={styles.productTag}>
                        <p>Carbon neutral 🍃</p>
                      </div>
                    ) : null}
                    {submission.plasticFree ? (
                      <div className={styles.productTag}>
                        <p>Plastic free ♻️</p>
                      </div>
                    ) : null}
                    {submission.living ? (
                      <div className={styles.productTag}>
                        <p>Living 🛋</p>
                      </div>
                    ) : null}
                    {submission.womanOwned ? (
                      <div className={styles.productTag}>
                        <p>Woman owned 🧘‍♀️</p>
                      </div>
                    ) : null}
                    {submission.familyOwned ? (
                      <div className={styles.productTag}>
                        <p>Family owned 👨‍👩‍👦</p>
                      </div>
                    ) : null}
                  </div>
                  <div className={styles.buyContainer}>
                    <div>
                      <a
                        href={submission.productLink}
                        target="_blank"
                        rel="noreferrer"
                        className={styles.buyNowButton}
                      >
                        Buy
                      </a>
                    </div>
                    <h3
                      style={{ color: "#656565", fontSize: 18, marginLeft: 10 }}
                    >
                      ${submission.cost}
                    </h3>
                  </div>
                  {submission.image_url ? (
                    <img
                      className={styles.image}
                      src={submission.image_url}
                      alt="Image describing either a store product or a DIY product."
                    />
                  ) : null}
                  <div className={styles.descriptionContainer}>
                    <h4>Description</h4>
                    <p>{submission.description}</p>
                  </div>
                  <div className={styles.commentsContainer}>
                    <h4>Comments</h4>
                    <div>
                      <form className={styles.commentLast}>
                        <p>Add comment:</p>
                        <textarea
                          className={styles.addCommentInput}
                          name="comment"
                        />
                        <button
                          type="submit"
                          className={styles.addCommentButton}
                        >
                          Add
                        </button>
                      </form>
                    </div>
                  </div>
                </div>
              ) : null}
              {submission.type == "DIY" ? (
                <div className={styles.storeContainer}>
                  <h3 style={{ color: "#656565" }}>
                    DIY | {submission.upvotes} upvotes
                  </h3>
                  <h1>{submission.product_name}</h1>
                  <h2>Alternative to: {submission.alternative}</h2>
                  <div className={styles.productTagsContainer}>
                    {submission.kitchen ? (
                      <div className={styles.productTag}>
                        <p>Kitchen 🍽 🧽 </p>
                      </div>
                    ) : null}
                    {submission.foodBeverages ? (
                      <div className={styles.productTag}>
                        <p>Food {"&"} beverages 🍯 🥬 🍳</p>
                      </div>
                    ) : null}
                    {submission.showerBath ? (
                      <div className={styles.productTag}>
                        <p>Shower {"&"} bath 🛁 🧼 🚽</p>
                      </div>
                    ) : null}
                    {submission.laundry ? (
                      <div className={styles.productTag}>
                        <p>Laundry 🧺</p>
                      </div>
                    ) : null}
                    {submission.clothing ? (
                      <div className={styles.productTag}>
                        <p>Clothing 👗👕👒</p>
                      </div>
                    ) : null}
                    {submission.selfCare ? (
                      <div className={styles.productTag}>
                        <p>Self care 🧴</p>
                      </div>
                    ) : null}
                    {submission.bedroom ? (
                      <div className={styles.productTag}>
                        <p>Bedroom 🛏</p>
                      </div>
                    ) : null}
                    {submission.coop ? (
                      <div className={styles.productTag}>
                        <p>Co-op 🤲</p>
                      </div>
                    ) : null}
                    {submission.organic ? (
                      <div className={styles.productTag}>
                        <p>Organic 🌎</p>
                      </div>
                    ) : null}
                    {submission.carbonNeutral ? (
                      <div className={styles.productTag}>
                        <p>Carbon neutral 🍃</p>
                      </div>
                    ) : null}
                    {submission.plasticFree ? (
                      <div className={styles.productTag}>
                        <p>Plastic free ♻️</p>
                      </div>
                    ) : null}
                    {submission.living ? (
                      <div className={styles.productTag}>
                        <p>Living 🛋</p>
                      </div>
                    ) : null}
                    {submission.womanOwned ? (
                      <div className={styles.productTag}>
                        <p>Woman owned 🧘‍♀️</p>
                      </div>
                    ) : null}
                    {submission.familyOwned ? (
                      <div className={styles.productTag}>
                        <p>Family owned 👨‍👩‍👦</p>
                      </div>
                    ) : null}
                  </div>
                  {submission.image_url ? (
                    <img
                      className={styles.image}
                      src={submission.image_url}
                      alt="Image describing either a store product or a DIY product."
                    />
                  ) : null}
                  <div className={styles.descriptionContainer}>
                    <h4>Materials</h4>
                    <p>{submission.materials}</p>
                  </div>
                  <div className={styles.descriptionContainer}>
                    <h4>Instructions</h4>
                    <p>{submission.description}</p>
                  </div>
                  <div className={styles.commentsContainer}>
                    <h4>Comments</h4>
                    <div>
                      <form className={styles.commentLast}>
                        <p>Add comment:</p>
                        <textarea
                          className={styles.addCommentInput}
                          name="comment"
                        />
                        <button
                          type="submit"
                          className={styles.addCommentButton}
                        >
                          Add
                        </button>
                      </form>
                    </div>
                  </div>
                </div>
              ) : null}
            </div>
          )}
        </main>
      </div>
    );
  }
};

export default DetailsPage;
