import { useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { RadioGroup } from "../ui/radio-group";
import emailjs from "emailjs-com";

const FormPage = () => {
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
        <Label>Gender</Label>
        <RadioGroup name="gender" className="flex space-x-4 mt-1">
          <div className="flex items-center">
            <Input
              id="male"
              name="gender"
              type="radio"
              value="Male"
              checked={formData.gender === "Male"}
              onChange={handleChange}
            />
            <Label htmlFor="male" className="ml-2">
              Male
            </Label>
          </div>
          <div className="flex items-center">
            <Input
              id="female"
              name="gender"
              type="radio"
              value="Female"
              checked={formData.gender === "Female"}
              onChange={handleChange}
            />
            <Label htmlFor="female" className="ml-2">
              Female
            </Label>
          </div>
        </RadioGroup>
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
  );
};

export default FormPage;