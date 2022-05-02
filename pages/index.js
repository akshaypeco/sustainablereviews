import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import { useState, useEffect } from "react";
import { MdCancel } from "react-icons/md";
import { BsFillCaretDownFill } from "react-icons/bs";
import { BsFillCaretUpFill } from "react-icons/bs";
import axios from "axios";

export default function Home() {
  const [votes, setVotes] = useState(0);
  const [filterArray, setFilterArray] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState(false);
  const [searchRes, setSearchRes] = useState([]);
  const [filterRes, setFilterRes] = useState([]);
  const [allRes, setAllRes] = useState([]);
  const [kitchen, setKitchen] = useState(false);
  const [foodBeverages, setFoodBeverages] = useState(false);
  const [showerBath, setShowerBath] = useState(false);
  const [laundry, setLaundry] = useState(false);
  const [selfCare, setSelfCare] = useState(false);
  const [bedroom, setBedroom] = useState(false);
  const [coop, setCoop] = useState(false);
  const [organic, setOrganic] = useState(false);
  const [plasticFree, setPlasticFree] = useState(false);
  const [clothing, setClothing] = useState(false);
  const [living, setLiving] = useState(false);
  const [womanOwned, setWomanOwned] = useState(false);
  const [familyOwned, setFamilyOwned] = useState(false);
  const [carbonNeutral, setCarbonNeutral] = useState(false);
  const [product, setProduct] = useState(false);
  const [store, setStore] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      if (searchRes.length == 0) {
        await axios
          .get("/api/allSubmissions")
          .then((response) => {
            setAllRes(response.data.submissions);
            setFilterRes(response.data.submissions);
          })
          .catch((err) => {
            if (err.response) {
              // client received an error response (5xx, 4xx)
              console.log("5xx, 4xx error");
            } else if (err.request) {
              // client never received a response, or request never left
              console.log(
                "client never received response, or request never left"
              );
            } else {
              // anything else
              console.log(err);
              console.log("other error");
            }
          });
      } else {
        setAllRes(searchRes);
      }
    };
    if (loading) {
      fetchData().then(setLoading(false));
    }
    if (filter) {
      setFilter(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loading, filter]);

  const filterItem = (curcat, filter) => {
    var newItem = [];
    if (curcat == false) {
      newItem = allRes;
      setKitchen(false);
      setFoodBeverages(false);
      setShowerBath(false);
      setLaundry(false);
      setSelfCare(false);
      setBedroom(false);
      setCoop(false);
      setOrganic(false);
      setPlasticFree(false);
      setClothing(false);
      setLiving(false);
      setFamilyOwned(false);
      setWomanOwned(false);
      setCarbonNeutral(false);
      setProduct(false);
      setStore(false);
    } else {
      newItem = filterRes.filter((newVal) => {
        if (filter == "kitchen") {
          return newVal.kitchen == curcat;
        }
        if (filter == "foodBeverages") {
          return newVal.foodBeverages == curcat;
        }
        if (filter == "showerBath") {
          return newVal.showerBath == curcat;
        }
        if (filter == "laundry") {
          return newVal.laundry == curcat;
        }
        if (filter == "selfCare") {
          return newVal.selfCare == curcat;
        }
        if (filter == "bedroom") {
          return newVal.bedroom == curcat;
        }
        if (filter == "coop") {
          return newVal.coop == curcat;
        }
        if (filter == "organic") {
          return newVal.organic == curcat;
        }
        if (filter == "plasticFree") {
          return newVal.plasticFree == curcat;
        }
        if (filter == "clothing") {
          return newVal.clothing == curcat;
        }
        if (filter == "living") {
          return newVal.living == curcat;
        }
        if (filter == "familyOwned") {
          return newVal.familyOwned == curcat;
        }
        if (filter == "womanOwned") {
          return newVal.womanOwned == curcat;
        }
        if (filter == "carbonNeutral") {
          return newVal.carbonNeutral == curcat;
        }
        if (filter == "product") {
          return newVal.type == "product";
        }
        if (filter == "store") {
          return newVal.type == "store";
        }
        if (filter == "DIY") {
          return newVal.type == "DIY";
        }
      });
    }
    setFilterRes(newItem);
    setFilter(true);
  };

  async function handleUpvote(docId, numUpvotes) {
    const data = {};
    data["docId"] = docId;
    data["numUpvotes"] = numUpvotes + 1;
    await axios
      .put("/api/upvote", data)
      .then(setLoading(true))
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
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/planet-earth.png" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          sustainable products, DIYs, reviews, and lowest prices
        </h1>

        <p className={styles.description}>
          <code className={styles.code}>Scroll or filter to find</code>
        </p>

        {/* <div className={styles.searchBarContainer}>
          <input className={styles.searchBar} placeholder="Product name" />
        </div>
        <p>or</p> */}
        {/* <div className={styles.searchBarContainer}>
          <input className={styles.searchBar} placeholder="UPC Code" />
        </div> */}
        <div className={styles.filterOptionsContainer}>
          <a
            className={styles.filterOption}
            onClick={() => {
              setKitchen(!kitchen);
              filterItem(!kitchen, "kitchen");
            }}
          >
            <p>Kitchen 🍽 🧽 </p>
            {kitchen && <MdCancel style={{ marginLeft: 9, fontSize: 18 }} />}
          </a>
          <a
            className={styles.filterOption}
            onClick={() => {
              setFoodBeverages(!foodBeverages);
              filterItem(!foodBeverages, "foodBeverages");
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
              filterItem(!showerBath, "showerBath");
            }}
          >
            <p>Shower {"&"} bath 🛁 🧼 🚽</p>
            {showerBath && <MdCancel style={{ marginLeft: 9, fontSize: 18 }} />}
          </a>
          <a
            className={styles.filterOption}
            onClick={() => {
              setLaundry(!laundry);
              filterItem(!laundry, "laundry");
            }}
          >
            <p>Laundry 🧺</p>
            {laundry && <MdCancel style={{ marginLeft: 9, fontSize: 18 }} />}
          </a>
          <a
            className={styles.filterOption}
            onClick={() => {
              setClothing(!clothing);
              filterItem(!clothing, "clothing");
            }}
          >
            <p>Clothing 👗👕👒</p>
            {clothing && <MdCancel style={{ marginLeft: 9, fontSize: 18 }} />}
          </a>
          <a
            className={styles.filterOption}
            onClick={() => {
              setSelfCare(!selfCare);
              filterItem(!selfCare, "selfCare");
            }}
          >
            <p>Self care 🧴</p>
            {selfCare && <MdCancel style={{ marginLeft: 9, fontSize: 18 }} />}
          </a>
          <a
            className={styles.filterOption}
            onClick={() => {
              setBedroom(!bedroom);
              filterItem(!bedroom, "bedroom");
            }}
          >
            <p>Bedroom 🛏</p>
            {bedroom && <MdCancel style={{ marginLeft: 9, fontSize: 18 }} />}
          </a>
          <a
            className={styles.filterOption}
            onClick={() => {
              setCoop(!coop);
              filterItem(!coop, "coop");
            }}
          >
            <p>Co-op 🤲</p>
            {coop && <MdCancel style={{ marginLeft: 9, fontSize: 18 }} />}
          </a>
          <a
            className={styles.filterOption}
            onClick={() => {
              setOrganic(!organic);
              filterItem(!organic, "organic");
            }}
          >
            <p>Organic 🌎</p>
            {organic && <MdCancel style={{ marginLeft: 9, fontSize: 18 }} />}
          </a>
          <a
            className={styles.filterOption}
            onClick={() => {
              setCarbonNeutral(!carbonNeutral);
              filterItem(!carbonNeutral, "carbonNeutral");
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
              filterItem(!plasticFree, "plasticFree");
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
              filterItem(!living, "living");
            }}
          >
            <p>Living 🛋</p>
            {living && <MdCancel style={{ marginLeft: 9, fontSize: 18 }} />}
          </a>
          <a
            className={styles.filterOption}
            onClick={() => {
              setFamilyOwned(!familyOwned);
              filterItem(!familyOwned, "familyOwned");
            }}
          >
            <p>Family owned 👨‍👩‍👦</p>
            {familyOwned && (
              <MdCancel style={{ marginLeft: 9, fontSize: 18 }} />
            )}
          </a>
          <a
            className={styles.filterOption}
            onClick={() => {
              setWomanOwned(!womanOwned);
              filterItem(!womanOwned, "womanOwned");
            }}
          >
            <p>Woman owned 🧘‍♀️</p>
            {womanOwned && <MdCancel style={{ marginLeft: 9, fontSize: 18 }} />}
          </a>
          {/* <a
            className={styles.filterOption}
            onClick={() => {
              setBlog(!blog);
            }}
          >
            <p>Blog ⌨️</p>
            {blog && <MdCancel style={{ marginLeft: 9, fontSize: 18 }} />}
          </a> */}
          <a
            className={styles.filterOption}
            onClick={() => {
              setProduct(!product);
              filterItem(!product, "product");
            }}
          >
            <p>Product 👓</p>
            {product && <MdCancel style={{ marginLeft: 9, fontSize: 18 }} />}
          </a>
          <a
            className={styles.filterOption}
            onClick={() => {
              setStore(!store);
              filterItem(!store, "store");
            }}
          >
            <p>Store 🖥</p>
            {store && <MdCancel style={{ marginLeft: 9, fontSize: 18 }} />}
          </a>
        </div>
        <h4>Showing {filterRes.length} results:</h4>
        <div className={styles.grid}>
          {loading ? (
            <div>
              <p>loading...</p>
            </div>
          ) : (
            filterRes.map((item) => (
              <div className={styles.card} key={item.id}>
                {item.verified ? (
                  <div>
                    <a className={styles.typeOfSubmission}>
                      {item.type.charAt(0).toUpperCase() + item.type.slice(1)}
                    </a>
                    {item.image ? (
                      <img
                        className={styles.image}
                        src="https://i5.walmartimages.com/asr/6b7517c1-4481-465f-be40-783825c5bf98.83395a641145f9b0138468d10b4134b0.jpeg?odnHeight=450&odnWidth=450&odnBg=ffffff"
                      />
                    ) : null}

                    <div className={styles.titleAndVotes}>
                      <div className={styles.votes}>
                        <BsFillCaretUpFill
                          className={styles.upvote}
                          onClick={() => {
                            handleUpvote(item.id, item.upvotes);
                          }}
                        />
                        <h4>{item.upvotes}</h4>
                      </div>
                      <div className={styles.companyAndDetailsContainer}>
                        {item.storename && item.type == "product" ? (
                          <p style={{ color: "grey", marginLeft: 17 }}>
                            {item.storename}
                          </p>
                        ) : null}

                        {item.product_name ? (
                          <h2>{item.product_name}</h2>
                        ) : null}
                        {item.storename && item.type == "store" ? (
                          <h2>{item.storename}</h2>
                        ) : null}
                        {item.URL && item.type == "store" ? (
                          <p
                            style={{
                              color: "grey",
                              marginLeft: 17,
                              textOverflow: "ellipsis",
                              whiteSpace: "nowrap",
                              overflow: "hidden",
                            }}
                          >
                            {item.URL}
                          </p>
                        ) : null}
                        {item.URL && item.type == "product" ? (
                          <p
                            style={{
                              color: "grey",
                              marginLeft: 17,
                              textOverflow: "ellipsis",
                              whiteSpace: "nowrap",
                              overflow: "hidden",
                            }}
                          >
                            {item.productLink}
                          </p>
                        ) : null}
                      </div>
                    </div>
                    {item.cost ? <h3>${item.cost}+ </h3> : null}
                    {item.websiteCost ? <h3>{item.websiteCost}</h3> : null}
                    {item.productLink ? (
                      <div className={styles.buyContainer}>
                        <div style={{ marginTop: 30, marginBottom: 32 }}>
                          <a
                            href={item.productLink}
                            target="_blank"
                            className={styles.buyNowButton}
                          >
                            Buy
                          </a>
                        </div>
                      </div>
                    ) : null}
                    {item.URL ? (
                      <div className={styles.buyContainer}>
                        <div style={{ marginTop: 30, marginBottom: 32 }}>
                          <a
                            href={item.URL}
                            target="_blank"
                            className={styles.buyNowButton}
                          >
                            Visit
                          </a>
                        </div>
                      </div>
                    ) : null}
                    {item.description ? (
                      <p style={{ marginTop: 10, color: "#575757" }}>
                        {item.description.charAt(0).toUpperCase() +
                          item.description.slice(1)}
                      </p>
                    ) : null}
                    <div className={styles.productTagsContainer}>
                      {item.kitchen ? (
                        <div className={styles.productTag}>
                          <p style={{ fontSize: 14 }}>Kitchen 🍽 🧽 </p>
                        </div>
                      ) : null}
                      {item.foodBeverages ? (
                        <div className={styles.productTag}>
                          <p style={{ fontSize: 14 }}>
                            Food {"&"} beverages 🍯 🥬 🍳
                          </p>
                        </div>
                      ) : null}
                      {item.showerBath ? (
                        <div className={styles.productTag}>
                          <p style={{ fontSize: 14 }}>
                            Shower {"&"} bath 🛁 🧼 🚽
                          </p>
                        </div>
                      ) : null}
                      {item.laundry ? (
                        <div className={styles.productTag}>
                          <p style={{ fontSize: 14 }}>Laundry 🧺</p>
                        </div>
                      ) : null}
                      {item.clothing ? (
                        <div className={styles.productTag}>
                          <p style={{ fontSize: 14 }}>Clothing 👗👕👒</p>
                        </div>
                      ) : null}
                      {item.selfCare ? (
                        <div className={styles.productTag}>
                          <p style={{ fontSize: 14 }}>Self care 🧴</p>
                        </div>
                      ) : null}
                      {item.bedroom ? (
                        <div className={styles.productTag}>
                          <p style={{ fontSize: 14 }}>Bedroom 🛏</p>
                        </div>
                      ) : null}
                      {item.coop ? (
                        <div className={styles.productTag}>
                          <p style={{ fontSize: 14 }}>Co-op 🤲</p>
                        </div>
                      ) : null}
                      {item.organic ? (
                        <div className={styles.productTag}>
                          <p style={{ fontSize: 14 }}>Organic 🌎</p>
                        </div>
                      ) : null}
                      {item.carbonNeutral ? (
                        <div className={styles.productTag}>
                          <p style={{ fontSize: 14 }}>Carbon neutral 🍃</p>
                        </div>
                      ) : null}
                      {item.plasticFree ? (
                        <div className={styles.productTag}>
                          <p style={{ fontSize: 14 }}>Plastic free ♻️</p>
                        </div>
                      ) : null}
                      {item.living ? (
                        <div className={styles.productTag}>
                          <p style={{ fontSize: 14 }}>Living 🛋</p>
                        </div>
                      ) : null}
                      {item.womanOwned ? (
                        <div className={styles.productTag}>
                          <p style={{ fontSize: 14 }}>Woman owned 🧘‍♀️</p>
                        </div>
                      ) : null}
                      {item.familyOwned ? (
                        <div className={styles.productTag}>
                          <p style={{ fontSize: 14 }}>Family owned 👨‍👩‍👦</p>
                        </div>
                      ) : null}
                    </div>
                  </div>
                ) : (
                  <p style={{ fontWeight: "500" }}>
                    Waiting on verification: post created on{" "}
                    {item.created.substring(0, 10)}
                  </p>
                )}
              </div>
            ))
          )}
        </div>
      </main>
    </div>
  );
}