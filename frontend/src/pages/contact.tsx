import DefaultLayout from "@/layouts/default";
import {
  Spacer,
  Input,
  Card,
  CardBody,
  CardHeader,
  Button,
  CircularProgress,
} from "@nextui-org/react";
import { Textarea } from "@nextui-org/input";

export default function ContactPage() {
  return (
    <DefaultLayout>
      <div>
        <h1 className="text-6xl pb-9">Contact us</h1>
        <div className="flex items-start gap-5">
          <Card className="w-5/12">
            <CardHeader className="pb-0 pt-2 px-4">
              <p className="text-lg font">Send us a message</p>
            </CardHeader>
            <CardBody className="flex flex-col gap-4">
              <Input label="Your name" />
              <Input type="email" label="Your email" />
              <Textarea label="Message body" />
              <Button color="primary">Submit</Button>
            </CardBody>
          </Card>
          <Card className="w-5/12">
            <CardHeader className="pb-0 pt-2 px-4">
              <p className="text-lg font">Send us an email</p>
            </CardHeader>
            <CardBody className="flex flex-col gap-4">
              <p>Alexandre Boutot (GH links, email, avatar...)</p>
              <p>Masataro Tatsuno (GH links, email, avatar...)</p>
            </CardBody>
          </Card>
        </div>

        <Spacer x={10} />
        <CircularProgress
          aria-label="Loading..."
          size="lg"
          color="warning"
          showValueLabel={true}
        />
      </div>
    </DefaultLayout>
  );
}
