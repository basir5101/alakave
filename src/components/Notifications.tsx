import { useState } from "react";

const Notifications = () => {
  const [activeTab, setActiveTab] = useState("messages");

  const showResult = (tab: string) => {
    setActiveTab(tab);
  };

  return (
    <div className="col-lg-9 col-md-8 col-12">
      <div className="py-10">
        <div className="row mb-5">
          <div className="col-md-12">
            <ul className="nav nav-pills">
              <li className="nav-item">
                <a
                  className={`nav-link messages ${
                    activeTab === "messages" ? "active" : ""
                  }`}
                  aria-current="page"
                  href="javascript:;"
                  onClick={() => showResult("messages")}
                >
                  Message
                </a>
              </li>
              <li className="nav-item" id="notification">
                <a
                  className={`nav-link notification ${
                    activeTab === "notifications" ? "active" : ""
                  }`}
                  href="javascript:;"
                  onClick={() => showResult("notifications")}
                >
                  Notifications
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div
          className={`row my_message ${
            activeTab === "messages" ? "d-block" : "d-none"
          }`}
        >
          <div className="col-md-12">
            <div className="mb-10">
              <ul className="list-group list-group-flush mt-0">
                <li className="list-group-item py-5 px-0">
                  <div className="d-flex justify-content-between p-3" style={{ alignItems: "center" }}>
                    <a href="https://alakave.com/chat/50">
                      <div className="d-flex">
                        <img
                          src="https://alakave.com/image/products/65b524af5c92b.jpg"
                          className="rounded-pill avatar-xl"
                          alt=""
                        />
                        <div className="ms-4">
                          <h5 className="mb-0 h6 h6 mt-8">
                            Chateau Petrus
                            <br />
                            <span>Delphine Peron</span>
                          </h5>
                        </div>
                      </div>
                    </a>
                    <div>
                      <p className="mb-0 small">Feb 24, 2024, 3:20 pm</p>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div
          className={`row my_notification ${
            activeTab === "notifications" ? "d-block" : "d-none"
          }`}
        >
          <div className="col-md-12 class-center">
            <div className="mb-10">
              <div className="col-md-12 text-center">
                <img src="image/no-notification.webp" />
                <br />
                <br />
                <h4>No Notification Found</h4>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Notifications;