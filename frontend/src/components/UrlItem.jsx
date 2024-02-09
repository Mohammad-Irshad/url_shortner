import React, { useState } from "react";
import { Button } from "react-bootstrap";
import { toast } from "react-toastify";

function UrlItem({ url, idx, filterUrlHandler }) {
  const [clicks, setClicks] = useState(url.urlClicks);

  const clickHandler = async (id) => {
    setClicks((ck) => ck + 1);
    try {
      const clickRequest = await fetch(`/api/urls/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ urlClicks: clicks }),
      });
    } catch (err) {
      console.log(err);
    }
  };

  const deleteHandler = async (id) => {
    try {
      const deleteRequest = await fetch(`/api/urls/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (deleteRequest.ok) {
        filterUrlHandler(id);
      } else {
        toast.error(
          "Something went wrong while deleting this url. Please try again later."
        );
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <tr>
      <td>{idx + 1}</td>
      <td>
        <div>
          <a target="_blank" href={url.longUrl} rel="noreferrer">
            {`${url.longUrl.substring(0, 20)}...`}
          </a>
        </div>
        <div style={{ fontSize: "12px" }}>{url.description}</div>
      </td>
      <td>
        <a
          target="_blank"
          href={url.longUrl}
          rel="noreferrer"
          onClick={() => clickHandler(url._id)}
        >
          {url.shortUrl}
        </a>
      </td>
      <td>{clicks}</td>
      <td>
        <div>
          <Button
            variant="danger"
            size="sm"
            onClick={() => deleteHandler(url._id)}
          >
            Delete
          </Button>
          {/*<Button variant="info" size="sm" className="m-2">
            Edit
  </Button>*/}
        </div>
      </td>
    </tr>
  );
}

export default UrlItem;
