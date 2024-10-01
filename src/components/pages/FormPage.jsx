import { useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import emailjs from "emailjs-com";

const FormPage = () => {
  const [selectedOption, setSelectedOption] = useState("target-weight");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    gender: "",
    message: "",
    url: "",
    file: null,
    country: "Egypt",
  });

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    if (type === "file") {
      setFormData({ ...formData, [name]: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const templateParams = {
      name: formData.name,
      email: formData.email,
      gender: formData.gender,
      message: formData.message,
      url: formData.url,
      file: formData.file ? formData.file.name : "",
      country: formData.country,
    };

    console.log("Sending the following data:", templateParams);

    emailjs
      .send(
        "service_c03vdwj",
        "template_ywdy8jp",
        templateParams,
        "JffZZVT3QDJma3QWw"
      )
      .then(() => {
        alert("Message sent successfully!");
      })
      .catch((error) => {
        console.error("Failed to send message:", error);
      });
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="mt-8 max-w-md mx-auto">
        <div>
          <Label htmlFor="name">Name</Label>
          <Input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mt-5">
          <Label htmlFor="email">Email</Label>
          <Input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mt-5">
          <h1 className="font-bold">Lose or Gain Weight</h1>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Current Weight:
            </label>
            <input
              type="number"
              name="currentWeight"
              className="mt-1 p-2 border border-gray-300 rounded-md w-full"
            />
          </div>

          <div className="flex space-x-4 mb-4">
            {/* Target Weight Option */}
            <div
              className={`p-4 rounded-lg shadow-lg w-1/2 ${
                selectedOption === "target-weight"
                  ? "bg-gray-100"
                  : "bg-gray-200"
              }`}
            >
              <div className="flex items-center">
                <input
                  type="radio"
                  id="target-weight"
                  name="option"
                  value="target-weight"
                  checked={selectedOption === "target-weight"}
                  onChange={() => setSelectedOption("target-weight")}
                  className="mr-2"
                />
                <label
                  htmlFor="target-weight"
                  className="text-sm font-medium text-gray-700"
                >
                  Target Weight in duration
                </label>
              </div>
              <div className="mt-2">
                <div className="mb-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Target Weight:
                  </label>
                  <input
                    type="number"
                    name="targetWeight"
                    className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                    disabled={selectedOption !== "target-weight"}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Duration:
                  </label>
                  <input
                    type="number"
                    name="duration"
                    className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                    disabled={selectedOption !== "target-weight"}
                  />
                </div>
              </div>
            </div>

            {/* Weight Duration Option */}
            <div
              className={`p-4 rounded-lg shadow-lg w-1/2 ${
                selectedOption === "weight-duration"
                  ? "bg-gray-100"
                  : "bg-gray-200"
              }`}
            >
              <div className="flex items-center">
                <input
                  type="radio"
                  id="weight-duration"
                  name="option"
                  value="weight-duration"
                  checked={selectedOption === "weight-duration"}
                  onChange={() => setSelectedOption("weight-duration")}
                  className="mr-2"
                />
                <label
                  htmlFor="weight-duration"
                  className="text-sm font-medium text-gray-700"
                >
                  Weight to be lost in the duration
                </label>
              </div>
              <div className="mt-2">
                <div className="mb-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Weight/Duration:
                  </label>
                  <input
                    type="number"
                    name="weightDuration"
                    className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                    disabled={selectedOption !== "weight-duration"}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Duration:
                  </label>
                  <select
                    name="weightDuration"
                    className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                    disabled={selectedOption !== "weight-duration"}
                  >
                    <option value="week">Week</option>
                    <option value="month">Month</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-5">
          <Label htmlFor="message">Message</Label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 rounded-md p-2"
          />
        </div>

        <div className="mt-5">
          <Label htmlFor="url">Website URL</Label>
          <Input
            type="url"
            id="url"
            name="url"
            value={formData.url}
            onChange={handleChange}
          />
        </div>

        <div className="mt-5">
          <Label htmlFor="file">File Upload</Label>
          <Input
            type="file"
            id="file"
            name="file"
            onChange={handleChange}
            accept=".png,.jpg,.jpeg,.pdf,.xlsx"
          />
        </div>

        <div className="mt-5">
          <Label htmlFor="country">Country</Label>
          <select
            id="country"
            name="country"
            value={formData.country}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-md p-2"
          >
            <option value="Egypt">Egypt</option>
            <option value="Korea">Korea</option>
            <option value="USA">USA</option>
          </select>
        </div>

        <div className="mt-8">
          <Button
            type="submit"
            className="w-full bg-blue-500 text-white p-2 rounded-md"
          >
            Submit
          </Button>
        </div>
      </form>
    </>
  );
};

export default FormPage;
