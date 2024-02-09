import { useEffect, useState } from "react";
import { Table, Alert, Badge } from "react-bootstrap";
import UrlItem from "./UrlItem";
import StylishHeading from "./StylishHeading";

function UrlList({ newUrl }) {
  const [totalUrls, setTotalUrls] = useState([]);

  const fetchUrls = async () => {
    try {
      const getUrls = await fetch("/api/urls/mine");
      const urls = await getUrls.json();
      setTotalUrls(urls);
      // console.log(urls);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchUrls();
  }, [newUrl]);

  const filterUrlHandler = (id) => {
    setTotalUrls((prevUrls) => {
      return prevUrls.filter((url) => url._id !== id);
    });
  };

  return (
    <>
      <div className="mb-4">
        <div>
          Total URLs: <Badge bg="primary">{totalUrls.length}</Badge>
        </div>
        {totalUrls.length === 0 ? (
          <Alert className="mt-2" variant="primary">
            No Urls to show. Try adding one.{" "}
          </Alert>
        ) : (
          <Table className="mt-4 mb-4" striped bordered hover>
            <thead>
              <tr>
                <th>#</th>
                <th>Full URL</th>
                <th>Short URL</th>
                <th>Clicks</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {totalUrls.map((url, idx) => (
                <UrlItem
                  key={url._id}
                  url={url}
                  idx={idx}
                  filterUrlHandler={filterUrlHandler}
                />
              ))}
            </tbody>
          </Table>
        )}
      </div>
    </>
  );
}

export default UrlList;
