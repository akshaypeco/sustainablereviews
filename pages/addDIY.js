import Head from "next/head";
import styles from "../styles/AddDIY.module.css";
import { useState } from "react";
import { MdCancel } from "react-icons/md";
import axios from "axios";
import Link from "next/link";

export default function AddDIY() {
  const [kitchen, setKitchen] = useState(false);
  const [foodBeverages, setFoodBeverages] = useState(false);
  const [showerBath, setShowerBath] = useState(false);
  const [laundry, setLaundry] = useState(false);
  const [clothing, setClothing] = useState(false);
  const [selfCare, setSelfCare] = useState(false);
  const [bedroom, setBedroom] = useState(false);
  const [coop, setCoop] = useState(false);
  const [organic, setOrganic] = useState(false);
  const [plasticFree, setPlasticFree] = useState(false);
  const [living, setLiving] = useState(false);

  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData(event.target);
    const data = {};
    formData.forEach((value, key) => (data[key] = value));

    data["kitchen"] = kitchen;
    data["foodBeverages"] = foodBeverages;
    data["showerBath"] = showerBath;
    data["laundry"] = laundry;
    data["selfCare"] = selfCare;
    data["bedroom"] = bedroom;
    data["coop"] = coop;
    data["organic"] = organic;
    data["plasticFree"] = plasticFree;
    data["clothing"] = clothing;
    data["living"] = living;
    data["type"] = "DIY";

    await axios
      .put("/api/addDIY", data)
      .then(setSubmitted(true))
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
      });
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>Add DIY</title>
        <meta name="description" content="Add your sustainable DIY product." />
        <link rel="icon" href="/planet-earth.png" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>Add a DIY item</h1>

        {submitted ? (
          <h3>
            Thanks! Your submission will get a quick lookover and will show up
            on the{" "}
            <Link href="/">
              <a style={{ textDecoration: "underline" }}>homepage</a>
            </Link>{" "}
            after verification.
          </h3>
        ) : (
          <div className={styles.formContainer}>
            <form className={styles.form} onSubmit={handleSubmit}>
              <h2>1. Name</h2>
              <div className={styles.inputContainer}>
                <input
                  type={"text"}
                  name="product"
                  className={styles.nameOfProduct}
                  required
                />
              </div>
              <h2>2. Materials</h2>
              <p>
                List the materials you use to make this, separated by commas.
              </p>
              <div className={styles.inputContainer}>
                <input
                  type={"text"}
                  name="materials"
                  placeholder="soap, oil, old pot"
                  className={styles.nameOfProduct}
                  required
                />
              </div>
              <h2>3. Cost</h2>
              <p>
                How much does it cost? If {"it's"} DIY, enter an estimation.
              </p>
              <div className={styles.inputContainer}>
                <input
                  type={"number"}
                  min="1"
                  step="any"
                  name="cost"
                  required
                  className={styles.costInput}
                />
              </div>
              <h2>4. Description</h2>
              <p>
                (Optional) Tell others what this is and why {"it's"}{" "}
                sustainable. Write as little or as much as you like!
              </p>
              <div className={styles.inputContainer}>
                <textarea
                  name="description"
                  className={styles.inputDescription}
                />
              </div>
              <h2>5. Tags</h2>
              <p>Select various tags that describe your DIY best.</p>
              <div className={styles.filterOptionsContainer}>
                <a
                  className={styles.filterOption}
                  onClick={() => {
                    setKitchen(!kitchen);
                  }}
                >
                  <p>Kitchen 🍽 🧽 </p>
                  {kitchen && (
                    <MdCancel style={{ marginLeft: 9, fontSize: 18 }} />
                  )}
                </a>
                <a
                  className={styles.filterOption}
                  onClick={() => {
                    setFoodBeverages(!foodBeverages);
                  }}
                >
                  <p>Food {"&"} beverages 🍯 🥬 🍳</p>
                  {foodBeverages && (
                    <MdCancel style={{ marginLeft: 9, fontSize: 18 }} />
                  )}
                </a>
                <a
                  className={styles.filterOption}
                  onClick={() => {
                    setShowerBath(!showerBath);
                  }}
                >
                  <p>Shower {"&"} bath 🛁 🧼 🚽</p>
                  {showerBath && (
                    <MdCancel style={{ marginLeft: 9, fontSize: 18 }} />
                  )}
                </a>
                <a
                  className={styles.filterOption}
                  onClick={() => {
                    setLaundry(!laundry);
                  }}
                >
                  <p>Laundry 🧺</p>
                  {laundry && (
                    <MdCancel style={{ marginLeft: 9, fontSize: 18 }} />
                  )}
                </a>
                <a
                  className={styles.filterOption}
                  onClick={() => {
                    setClothing(!clothing);
                  }}
                >
                  <p>Clothing 👗👕👒</p>
                  {clothing && (
                    <MdCancel style={{ marginLeft: 9, fontSize: 18 }} />
                  )}
                </a>
                <a
                  className={styles.filterOption}
                  onClick={() => {
                    setSelfCare(!selfCare);
                  }}
                >
                  <p>Self care 🧴</p>
                  {selfCare && (
                    <MdCancel style={{ marginLeft: 9, fontSize: 18 }} />
                  )}
                </a>
                <a
                  className={styles.filterOption}
                  onClick={() => {
                    setBedroom(!bedroom);
                  }}
                >
                  <p>Bedroom 🛏</p>
                  {bedroom && (
                    <MdCancel style={{ marginLeft: 9, fontSize: 18 }} />
                  )}
                </a>
                <a
                  className={styles.filterOption}
                  onClick={() => {
                    setCoop(!coop);
                  }}
                >
                  <p>Co-op 🤲</p>
                  {coop && <MdCancel style={{ marginLeft: 9, fontSize: 18 }} />}
                </a>
                <a
                  className={styles.filterOption}
                  onClick={() => {
                    setOrganic(!organic);
                  }}
                >
                  <p>Organic 🌎</p>
                  {organic && (
                    <MdCancel style={{ marginLeft: 9, fontSize: 18 }} />
                  )}
                </a>
                <a
                  className={styles.filterOption}
                  onClick={() => {
                    setPlasticFree(!plasticFree);
                  }}
                >
                  <p>Plastic free ♻️</p>
                  {plasticFree && (
                    <MdCancel style={{ marginLeft: 9, fontSize: 18 }} />
                  )}
                </a>
                <a
                  className={styles.filterOption}
                  onClick={() => {
                    setLiving(!living);
                  }}
                >
                  <p>Living 🛋</p>
                  {living && (
                    <MdCancel style={{ marginLeft: 9, fontSize: 18 }} />
                  )}
                </a>
              </div>
              <h2>6. Image (COMING SOON)</h2>
              <p>
                Sorry, for now you {"can't"} upload any images. {"I'll"} try to
                get this working ASAP!
              </p>
              {/* <p>(Optional) Upload an image.</p> */}
              <div className={styles.inputContainer}>
                <input
                  type="file"
                  name="image"
                  className={styles.image}
                  accept="image/x-png,image/gif,image/jpeg"
                />
              </div>
              <button className={styles.submitButton} type="submit">
                Submit
              </button>
            </form>
          </div>
        )}
      </main>
    </div>
  );
}
