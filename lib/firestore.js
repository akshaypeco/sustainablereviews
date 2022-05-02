import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  orderBy,
  query,
  setDoc,
  where,
} from "firebase/firestore";
import db from "./firebase";

export async function addItem(data) {
  var description = "";
  var image = "";
  if (data.description) {
    description = data.description;
  }
  if (data.image) {
    image = data.image;
  }

  try {
    await setDoc(
      doc(collection(db, "submissions")),
      {
        product_name: data.product,
        product_name_lower: data.product.toLowerCase(),
        productLink: data.productLink,
        storename: data.storename,
        cost: data.cost,
        description: description,
        kitchen: data.kitchen,
        foodBeverages: data.foodBeverages,
        showerBath: data.showerBath,
        laundry: data.laundry,
        selfCare: data.selfCare,
        bedroom: data.bedroom,
        coop: data.coop,
        organic: data.organic,
        plasticFree: data.plasticFree,
        clothing: data.clothing,
        womanOwned: data.womanOwned,
        familyOwned: data.familyOwned,
        living: data.living,
        carbonNeutral: data.carbonNeutral,
        image_url: image,
        upvotes: 1,
        downvotes: 0,
        verified: true,
        type: data.type,
        created: new Date().toISOString(),
      },
      { merge: true }
    );
  } catch (e) {
    console.error("Error adding shop: ", e);
  }
}

export async function addStore(data) {
  var description = "";
  var websiteCost = "";
  if (data.websiteCost) {
    websiteCost = data.websiteCost;
  }
  if (data.description) {
    description = data.description;
  }

  try {
    await setDoc(
      doc(collection(db, "submissions")),
      {
        storename: data.storename,
        URL: data.url,
        description: description,
        kitchen: data.kitchen,
        foodBeverages: data.foodBeverages,
        showerBath: data.showerBath,
        laundry: data.laundry,
        selfCare: data.selfCare,
        bedroom: data.bedroom,
        coop: data.coop,
        organic: data.organic,
        plasticFree: data.plasticFree,
        clothing: data.clothing,
        websiteCost: websiteCost,
        womanOwned: data.womanOwned,
        familyOwned: data.familyOwned,
        carbonNeutral: data.carbonNeutral,
        living: data.living,
        upvotes: 1,
        downvotes: 0,
        verified: true,
        type: data.type,
        created: new Date().toISOString(),
      },
      { merge: true }
    );
  } catch (e) {
    console.error("Error adding store: ", e);
  }
}

export async function addDIY(data) {
  var description = "";
  var image = "";
  if (data.description) {
    description = data.description;
  }
  if (data.image) {
    image = data.image;
  }

  try {
    await setDoc(
      doc(collection(db, "submissions")),
      {
        product_name: data.product,
        product_name_lower: data.product.toLowerCase(),
        materials: data.materials,
        cost: data.cost,
        description: description,
        kitchen: data.kitchen,
        foodBeverages: data.foodBeverages,
        showerBath: data.showerBath,
        laundry: data.laundry,
        selfCare: data.selfCare,
        bedroom: data.bedroom,
        coop: data.coop,
        organic: data.organic,
        plasticFree: data.plasticFree,
        clothing: data.clothing,
        living: data.living,
        image_url: image,
        upvotes: 1,
        downvotes: 0,
        verified: true,
        type: data.type,
        created: new Date().toISOString(),
      },
      { merge: true }
    );
  } catch (e) {
    console.error("Error adding DIY: ", e);
  }
}

export async function upvote(data) {
  try {
    await setDoc(
      doc(db, "submissions", data.docId),
      {
        upvotes: data.numUpvotes,
        updated: new Date().toISOString(),
      },
      { merge: true }
    );
  } catch (e) {
    console.error("Error adding upvote: ", e);
  }
}

export async function getAll() {
  const res = [];
  try {
    const q = query(collection(db, "submissions"), orderBy("upvotes", "desc"));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) =>
      res.push({
        id: doc.id,
        ...doc.data(),
      })
    );
    return res;
  } catch (e) {
    console.log("Error in getAll function : ", e);
  }
}

// export async function searchShops(param) {
//   try {
//     if (param != null) {
//       var strSearch = param.toLowerCase();
//       var strLength = strSearch.length;
//       var strFrontCode = strSearch.slice(0, strLength - 1);
//       var strEndCode = strSearch.slice(strLength - 1, strSearch.length);
//       var startcode = strSearch;
//       var endcode =
//         strFrontCode + String.fromCharCode(strEndCode.charCodeAt(0) + 1);
//       const shopRef = collection(db, "shops");
//       const q = query(
//         shopRef,
//         where("shopname_lower", ">=", startcode),
//         where("shopname_lower", "<", endcode)
//       );
//       const results = [];
//       const querySnapshot = await getDocs(q);
//       querySnapshot.forEach((doc) =>
//         results.push({
//           id: doc.id,
//           ...doc.data(),
//         })
//       );
//       return results;
//     }
//   } catch (e) {
//     console.error("Error finding search results: ", e);
//   }
// }
