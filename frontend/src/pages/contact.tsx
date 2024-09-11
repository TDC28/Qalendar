import DefaultLayout from "@/layouts/default";
import {
  Avatar,
  Textarea,
  Input,
  Card,
  CardBody,
  CardHeader,
  Button,
} from "@nextui-org/react";
import { useState } from "react";

export default function ContactPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const sendEmail = async () => {
    try {
      const response = await fetch("http://localhost:8000/api/contact/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, message }),
      });

      const data = await response.json();
      alert(data.status);

      setName("");
      setEmail("");
      setMessage("");
    } catch (error) {
      alert("There was an error sending your message.");
    }
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handleMessageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMessage(e.target.value);
  };

  return (
    <DefaultLayout>
      <div>
        <h1 className="text-6xl pb-9">Contact us</h1>
        <div className="flex items-start gap-5">
          <Card className="w-5/12">
            <CardHeader className="pb-0 pt-2 px-4">
              <p className="text-lg font">Send us some feedback</p>
            </CardHeader>
            <CardBody className="flex flex-col gap-4">
              <Input
                type="text"
                value={name}
                label="Your name"
                onChange={handleNameChange}
              />
              <Input
                type="email"
                value={email}
                label="Your email"
                onChange={handleEmailChange}
              />
              <Textarea
                type="text"
                value={message}
                label="Message body"
                onChange={handleMessageChange}
              />
              <Button color="primary" onClick={sendEmail}>
                Submit
              </Button>
            </CardBody>
          </Card>
          <Card className="w-1/3">
            <CardHeader className="pb-0 pt-2 px-4">
              <p className="text-lg font">Connect with us</p>
            </CardHeader>
            <CardBody className="flex flex-col gap-4">
              <Card>
                <CardBody>
                  <div className="flex flex-row items-center justify-between">
                    <div className="flex flex-row justify-start items-center gap-3">
                      <Avatar src="/alex.png" />
                      <p className="pr-3">Alexandre Boutot </p>
                    </div>
                    <div className="flex flex-row gap-3 pr-2">
                      <a href="https://www.linkedin.com/in/alexandre-boutot-aa6506289/">
                        <img src="/linkedin.png" width="21" />
                      </a>
                      <a href="https://github.com/TDC28">
                        <img src="/github.png" width="21" />
                      </a>
                      <a href="mailto:aboutot@uwaterloo.ca">
                        <img src="/email.png" width="21" />
                      </a>
                    </div>
                  </div>
                </CardBody>
              </Card>
              <Card>
                <CardBody>
                  <div className="flex flex-row items-center justify-between">
                    <div className="flex flex-row justify-start items-center gap-3">
                      <Avatar />
                      <p className="pr-3">Masataro Tatsuno</p>
                    </div>
                    <div className="flex flex-row gap-3 pr-2">
                      <a href="https://www.linkedin.com/in/masatarotatsuno/">
                        <img src="/linkedin.png" width="21" />
                      </a>
                      <a href="https://github.com/Tatsu-Turtle">
                        <img src="/github.png" width="21" />
                      </a>
                      <a href="mailto:mtatsuno@uwaterloo.ca">
                        <img src="/email.png" width="21" />
                      </a>
                    </div>
                  </div>
                </CardBody>
              </Card>
            </CardBody>
          </Card>
        </div>
      </div>
    </DefaultLayout>
  );
}
