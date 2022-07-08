import Link from "next/link";
import React from "react";

const Navbar = () => {
  return (
    <nav>
      <div>
        <Link href={"/"}>
          <a>turningreen 🌍</a>
        </Link>
      </div>
      <div>
        <Link href={"/addDIY"}>
          <a>Add DIY</a>
        </Link>
        <Link href={"/addstore"}>
          <a>Add store</a>
        </Link>
        <Link href={"/additem"}>
          <a>Add product</a>
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
