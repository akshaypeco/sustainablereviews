import Head from "next/head";
import styles from "../styles/AddItem.module.css";
import { useState } from "react";
import { MdCancel } from "react-icons/md";
import axios from "axios";
import Link from "next/link";

export default function AddItem() {
  const [isLoading, setIsLoading] = useState(false);
  const [uploadedImage, setUploadedImage] = useState(null);
  const [createObjectURL, setCreateObjectURL] = useState(null);
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
  const [submitted, setSubmitted] = useState(false);
  const [living, setLiving] = useState(false);
  const [womanOwned, setWomanOwned] = useState(false);
  const [familyOwned, setFamilyOwned] = useState(false);
  const [carbonNeutral, setCarbonNeutral] = useState(false);

  const uploadToClient = (event) => {
    if (event.target.files && event.target.files[0]) {
      const i = event.target.files[0];

      setUploadedImage(i);
      setCreateObjectURL(URL.createObjectURL(i));
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);

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
    data["womanOwned"] = womanOwned;
    data["familyOwned"] = familyOwned;
    data["living"] = living;
    data["carbonNeutral"] = carbonNeutral;
    data["type"] = "product";

    if (uploadedImage) {
      const pictureData = new FormData();
      pictureData.append("file", uploadedImage);
      pictureData.append("upload_preset", "v1-sustainablereviews");
      const res = await fetch(
        "https://api.cloudinary.com/v1_1/sustainablereviews/image/upload",
        {
          method: "POST",
          body: pictureData,
        }
      ).then((r) => r.json());

      data["imageUrl"] = res["secure_url"];
    }

    await axios
      .put("/api/additem", data)
      .then(setIsLoading(false))
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
        <title>Add item</title>
        <meta name="description" content="Add a sustainable product." />
        <link rel="icon" href="/planet-earth.png" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>Add a product</h1>

        <div className={styles.description}>
          <div>
            <code className={styles.code}>
              For {"DIY's"}, click{" "}
              <Link href="/addDIY">
                <a style={{ textDecoration: "underline" }}>here</a>
              </Link>
            </code>
          </div>
        </div>
        {submitted ? (
          <div>
            <h3>
              Thanks! Your submission will get a quick lookover and will show up
              on the{" "}
              <Link href="/">
                <a style={{ textDecoration: "underline" }}>homepage</a>
              </Link>{" "}
              after verification.
            </h3>
          </div>
        ) : (
          <div className={styles.formContainer}>
            <form className={styles.form} onSubmit={handleSubmit}>
              <h2>1. Name of product</h2>
              <div className={styles.inputContainer}>
                <input
                  type={"text"}
                  name="product"
                  className={styles.nameOfProduct}
                  required
                />
              </div>
              <h2>2. Alternative to...?</h2>
              <p>
                What did this product replace for you? A response could be "Tide
                Pods" or "Detergent".
              </p>
              <div className={styles.inputContainer}>
                <input
                  type={"text"}
                  name="alternative"
                  className={styles.nameOfProduct}
                  required
                />
              </div>
              <h2>3. Store name</h2>
              <div className={styles.inputContainer}>
                <input
                  type={"text"}
                  name="storename"
                  className={styles.productLink}
                  required
                />
              </div>
              <h2>4. Product link</h2>
              <div className={styles.inputContainer}>
                <input
                  type={"url"}
                  name="productLink"
                  className={styles.productLink}
                  required
                />
              </div>
              <h2>5. Cost</h2>
              <p>In US dollars.</p>
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
              <h2>6. Description</h2>
              <p>
                Tell others what this is and why {"it's"} sustainable. Write as
                little or as much as you like!
              </p>
              <div className={styles.inputContainer}>
                <textarea
                  name="description"
                  className={styles.inputDescription}
                  required
                />
              </div>
              <h2>7. Tags</h2>
              <p>Select various tags that describe the product best.</p>
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
                    setCarbonNeutral(!carbonNeutral);
                  }}
                >
                  <p>Carbon neutral 🍃</p>
                  {carbonNeutral && (
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
                <a
                  className={styles.filterOption}
                  onClick={() => {
                    setWomanOwned(!womanOwned);
                  }}
                >
                  <p>Woman owned 🧘‍♀️</p>
                  {womanOwned && (
                    <MdCancel style={{ marginLeft: 9, fontSize: 18 }} />
                  )}
                </a>
                <a
                  className={styles.filterOption}
                  onClick={() => {
                    setFamilyOwned(!familyOwned);
                  }}
                >
                  <p>Family owned 👨‍👩‍👦</p>
                  {familyOwned && (
                    <MdCancel style={{ marginLeft: 9, fontSize: 18 }} />
                  )}
                </a>
              </div>
              <h2>8. Image</h2>
              <p>(Optional)</p>
              <div className={styles.inputContainer}>
                <input
                  type="file"
                  name="image"
                  className={styles.image}
                  accept="image/x-png,image/gif,image/jpeg"
                  onChange={uploadToClient}
                />
                {uploadedImage ? (
                  <img
                    style={{ marginTop: 30 }}
                    src={createObjectURL}
                    height={200}
                    width={200}
                  ></img>
                ) : null}
              </div>
              <button
                className={styles.submitButton}
                type="submit"
                disabled={isLoading}
              >
                Submit
              </button>
            </form>
          </div>
        )}
      </main>
    </div>
  );
}
