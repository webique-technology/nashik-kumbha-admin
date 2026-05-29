import { useState } from "react";

const HomePageSettings = () => {

     const [formData, setFormData] = useState({
        websiteName: "",
        whatsapp: "",
        domain: "",
        logo: null,
    });

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        if (name === "logo") {
            setFormData({ ...formData, logo: files[0] });
        } else {
            setFormData({ ...formData, [name]: value });
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(formData);

        // ✅ Reset form after submit
        setFormData({
            websiteName: "",
            whatsapp: "",
            domain: "",
            logo: null,
        }); 

        // Optional: clear file input manually
        e.target.reset();
    };
  return (
    <div className="page-container h-screen">
        <div className="max-w-[1400px] mx-auto  bg-white shadow-lg rounded-2xl p-8">
       
    <div>
          
            <form onSubmit={handleSubmit} className="space-y-5">

                {/* Website Name */}
                <div className="form-grid">
                <div>
                    <label className="block mb-1 text-sm font-medium">
                        Website Name
                    </label>
                    <input
                        type="text"
                        name="websiteName"
                        placeholder="Webique Digital Card"
                        value={formData.websiteName}
                        onChange={handleChange}
                        className="form-input bg-surface-container-low focus:ring-2 focus:ring-primary/20"
                    />
                </div>

                {/* WhatsApp Number */}
                <div>
                    <label className="block mb-1 text-sm font-medium">
                        WhatsApp No
                    </label>
                    <input
                        type="text"
                        name="whatsapp"
                        placeholder="9860188007"
                        value={formData.whatsapp}
                        onChange={handleChange}
                        className="form-input bg-surface-container-low focus:ring-2 focus:ring-primary/20"
                    />
                </div>

                {/* Logo Upload */}
                <div>
                    <label className="block mb-1 text-sm font-medium">
                        Logo Upload
                    </label>
                    <input
                        type="file"
                        name="logo"
                        onChange={handleChange}
                        className="w-full border rounded-lg px-3 py-2 file:mr-4 file:py-1 file:px-3 file:border-0 file:bg-[#a14000] file:text-white file:rounded-md"
                    />
                </div>

                {/* Domain Settings */}
                <div>
                    <label className="block mb-1 text-sm font-medium">
                        Domain Settings
                    </label>
                    <input
                        type="text"
                        name="domain"
                        placeholder="Enter domain"
                        value={formData.domain}
                        onChange={handleChange}
                        className="form-input bg-surface-container-low focus:ring-2 focus:ring-primary/20"
                    />
                </div>

                {/* Submit Button */}
                <button
                    type="submit"
                    className="bg-primary text-white px-6 py-3 rounded-lg font-semibold max-w-fit"
                >
                    Save Changes
                </button>
                </div>
            </form>
        </div>
        </div>
        </div>

  )
}

export default HomePageSettings