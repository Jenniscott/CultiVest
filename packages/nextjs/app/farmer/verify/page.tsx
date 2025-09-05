"use client";

import { useState } from "react";
import { DocumentTextIcon, MapPinIcon, PhotoIcon, UserIcon } from "@heroicons/react/24/outline";
// import { useRouter } from "next/navigation";
// import { useAccount } from "wagmi";
import { useRouter } from "~~/hooks/mockHooks";

const FarmerVerification = () => {
  const isConnected = true;
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    fullName: "",
    farmLocation: "",
    bio: "",
    governmentId: null as File | null,
    landDocument: null as File | null,
    farmPhotos: null as File | null,
    businessRegistration: null as File | null,
    agriculturalCertificate: null as File | null,
    bankStatement: null as File | null,
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileChange = (fieldName: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setFormData(prev => ({
      ...prev,
      [fieldName]: file,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Mock submission to backend
      console.log("Submitting farmer verification:", formData);

      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));

      // In real implementation, this would:
      // 1. Upload document to Web3.storage/IPFS
      // 2. Send data to backend for verification
      // 3. Backend would vet and call smart contract

      alert("Verification submitted successfully! You will be notified when the review is complete.");
      router.push("/farmer");
    } catch (error) {
      console.error("Error submitting verification:", error);
      alert("Error submitting verification. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isConnected) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-black mb-4">Connect Your Wallet</h1>
          <p className="text-gray-600">Please connect your wallet to access farmer verification</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white text-black">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-black mb-2">Farmer Verification</h1>
          <p className="text-gray-600">Complete your verification to create farming projects and access funding.</p>
        </div>

        <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 mb-8">
          <h2 className="text-xl font-semibold text-black mb-4">Required Documents</h2>
          <div className="grid md:grid-cols-2 gap-4 text-sm text-gray-600">
            <div>
              <h3 className="font-medium text-gray-800 mb-2">📋 Essential Documents</h3>
              <ul className="space-y-1">
                <li>• Government-issued ID (Required)</li>
                <li>• Land ownership/lease document (Required)</li>
                <li>• Recent farm photos (Required)</li>
                <li>• Bank statement (last 6 months) (Required)</li>
              </ul>
            </div>
            <div>
              <h3 className="font-medium text-gray-800 mb-2">📄 Additional Documents</h3>
              <ul className="space-y-1">
                <li>• Business/cooperative registration</li>
                <li>• Agricultural certificates/training</li>
              </ul>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-2">
              <UserIcon className="h-4 w-4 inline mr-2" />
              Full Name
            </label>
            <input
              type="text"
              id="fullName"
              name="fullName"
              required
              value={formData.fullName}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black focus:border-black"
              placeholder="Enter your full name"
            />
          </div>

          <div>
            <label htmlFor="farmLocation" className="block text-sm font-medium text-gray-700 mb-2">
              <MapPinIcon className="h-4 w-4 inline mr-2" />
              Farm Location
            </label>
            <input
              type="text"
              id="farmLocation"
              name="farmLocation"
              required
              value={formData.farmLocation}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black focus:border-black"
              placeholder="e.g., Ashanti Region, Ghana"
            />
          </div>

          <div>
            <label htmlFor="bio" className="block text-sm font-medium text-gray-700 mb-2">
              <DocumentTextIcon className="h-4 w-4 inline mr-2" />
              Short Bio & Farm Description
            </label>
            <textarea
              id="bio"
              name="bio"
              rows={4}
              required
              value={formData.bio}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black focus:border-black"
              placeholder="Tell us about yourself and your farming experience (max 500 characters)"
              maxLength={500}
            />
            <p className="text-sm text-gray-500 mt-1">{formData.bio.length}/500 characters</p>
          </div>

          <div>
            <label htmlFor="governmentId" className="block text-sm font-medium text-gray-700 mb-2">
              <PhotoIcon className="h-4 w-4 inline mr-2" />
              Government ID (Required) *
            </label>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center hover:border-gray-400 transition-colors">
              <input
                type="file"
                id="governmentId"
                name="governmentId"
                required
                onChange={handleFileChange("governmentId")}
                accept=".pdf,.jpg,.jpeg,.png"
                className="hidden"
              />
              <label htmlFor="governmentId" className="cursor-pointer flex flex-col items-center">
                <PhotoIcon className="h-8 w-8 text-gray-400 mb-2" />
                {formData.governmentId ? (
                  <div>
                    <p className="text-sm font-medium text-black">{formData.governmentId.name}</p>
                    <p className="text-xs text-gray-500">Click to change file</p>
                  </div>
                ) : (
                  <div>
                    <p className="text-sm font-medium text-gray-900">Upload Government ID</p>
                    <p className="text-xs text-gray-500">PDF, JPG, PNG up to 10MB</p>
                  </div>
                )}
              </label>
            </div>
          </div>

          <div>
            <label htmlFor="landDocument" className="block text-sm font-medium text-gray-700 mb-2">
              <DocumentTextIcon className="h-4 w-4 inline mr-2" />
              Land Ownership/Lease Document (Required) *
            </label>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center hover:border-gray-400 transition-colors">
              <input
                type="file"
                id="landDocument"
                name="landDocument"
                required
                onChange={handleFileChange("landDocument")}
                accept=".pdf,.jpg,.jpeg,.png"
                className="hidden"
              />
              <label htmlFor="landDocument" className="cursor-pointer flex flex-col items-center">
                <DocumentTextIcon className="h-8 w-8 text-gray-400 mb-2" />
                {formData.landDocument ? (
                  <div>
                    <p className="text-sm font-medium text-black">{formData.landDocument.name}</p>
                    <p className="text-xs text-gray-500">Click to change file</p>
                  </div>
                ) : (
                  <div>
                    <p className="text-sm font-medium text-gray-900">Upload Land Document</p>
                    <p className="text-xs text-gray-500">Certificate, lease agreement, etc.</p>
                  </div>
                )}
              </label>
            </div>
          </div>

          <div>
            <label htmlFor="farmPhotos" className="block text-sm font-medium text-gray-700 mb-2">
              <PhotoIcon className="h-4 w-4 inline mr-2" />
              Recent Farm Photos (Required) *
            </label>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center hover:border-gray-400 transition-colors">
              <input
                type="file"
                id="farmPhotos"
                name="farmPhotos"
                required
                onChange={handleFileChange("farmPhotos")}
                accept=".jpg,.jpeg,.png"
                multiple
                className="hidden"
              />
              <label htmlFor="farmPhotos" className="cursor-pointer flex flex-col items-center">
                <PhotoIcon className="h-8 w-8 text-gray-400 mb-2" />
                {formData.farmPhotos ? (
                  <div>
                    <p className="text-sm font-medium text-black">{formData.farmPhotos.name}</p>
                    <p className="text-xs text-gray-500">Click to change file</p>
                  </div>
                ) : (
                  <div>
                    <p className="text-sm font-medium text-gray-900">Upload Farm Photos</p>
                    <p className="text-xs text-gray-500">Multiple photos of your farm, crops, equipment</p>
                  </div>
                )}
              </label>
            </div>
          </div>

          <div>
            <label htmlFor="bankStatement" className="block text-sm font-medium text-gray-700 mb-2">
              <DocumentTextIcon className="h-4 w-4 inline mr-2" />
              Bank Statement (last 6 months) (Required) *
            </label>
            <div className="border-2 border-dashed border-gray-200 rounded-lg p-4 text-center hover:border-gray-300 transition-colors">
              <input
                type="file"
                id="bankStatement"
                name="bankStatement"
                onChange={handleFileChange("bankStatement")}
                accept=".pdf"
                className="hidden"
              />
              <label htmlFor="bankStatement" className="cursor-pointer flex flex-col items-center">
                <DocumentTextIcon className="h-6 w-6 text-gray-400 mb-2" />
                {formData.bankStatement ? (
                  <div>
                    <p className="text-sm font-medium text-black">{formData.bankStatement.name}</p>
                    <p className="text-xs text-gray-500">Click to change file</p>
                  </div>
                ) : (
                  <div>
                    <p className="text-sm text-gray-700">Upload Bank Statement</p>
                    <p className="text-xs text-gray-500">Helps verify financial stability (PDF only)</p>
                  </div>
                )}
              </label>
            </div>
          </div>

          <div className="border-t border-gray-200 pt-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">📄 Additional Documents (Optional)</h3>
            <div className="space-y-4">
              <div>
                <label htmlFor="businessRegistration" className="block text-sm font-medium text-gray-700 mb-2">
                  <DocumentTextIcon className="h-4 w-4 inline mr-2" />
                  Business/Cooperative Registration
                </label>
                <div className="border-2 border-dashed border-gray-200 rounded-lg p-4 text-center hover:border-gray-300 transition-colors">
                  <input
                    type="file"
                    id="businessRegistration"
                    name="businessRegistration"
                    onChange={handleFileChange("businessRegistration")}
                    accept=".pdf,.jpg,.jpeg,.png"
                    className="hidden"
                  />
                  <label htmlFor="businessRegistration" className="cursor-pointer flex flex-col items-center">
                    <DocumentTextIcon className="h-6 w-6 text-gray-400 mb-2" />
                    {formData.businessRegistration ? (
                      <div>
                        <p className="text-sm font-medium text-black">{formData.businessRegistration.name}</p>
                        <p className="text-xs text-gray-500">Click to change file</p>
                      </div>
                    ) : (
                      <div>
                        <p className="text-sm text-gray-700">Upload Business Registration</p>
                        <p className="text-xs text-gray-500">If you have a registered farming business</p>
                      </div>
                    )}
                  </label>
                </div>
              </div>

              <div>
                <label htmlFor="agriculturalCertificate" className="block text-sm font-medium text-gray-700 mb-2">
                  <DocumentTextIcon className="h-4 w-4 inline mr-2" />
                  Agricultural Certificates/Training
                </label>
                <div className="border-2 border-dashed border-gray-200 rounded-lg p-4 text-center hover:border-gray-300 transition-colors">
                  <input
                    type="file"
                    id="agriculturalCertificate"
                    name="agriculturalCertificate"
                    onChange={handleFileChange("agriculturalCertificate")}
                    accept=".pdf,.jpg,.jpeg,.png"
                    className="hidden"
                  />
                  <label htmlFor="agriculturalCertificate" className="cursor-pointer flex flex-col items-center">
                    <DocumentTextIcon className="h-6 w-6 text-gray-400 mb-2" />
                    {formData.agriculturalCertificate ? (
                      <div>
                        <p className="text-sm font-medium text-black">{formData.agriculturalCertificate.name}</p>
                        <p className="text-xs text-gray-500">Click to change file</p>
                      </div>
                    ) : (
                      <div>
                        <p className="text-sm text-gray-700">Upload Agricultural Certificates</p>
                        <p className="text-xs text-gray-500">Training certificates, organic certifications, etc.</p>
                      </div>
                    )}
                  </label>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <h3 className="text-sm font-medium text-yellow-800 mb-2">Enhanced Verification Process</h3>
            <ul className="text-sm text-yellow-700 space-y-1">
              <li>1. Submit all required documents and information</li>
              <li>2. Our agricultural experts review your application (2-3 business days)</li>
              <li>3. Additional verification may be required for larger projects</li>
              <li>4. Once approved, you receive verified farmer status</li>
              <li>5. Create and manage quick-cycle farming projects (60-120 days)</li>
            </ul>
          </div>

          <div className="flex gap-4">
            <button
              type="button"
              onClick={() => router.back()}
              className="flex-1 bg-white text-black border-2 border-gray-300 py-3 px-4 rounded-md hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex-1 bg-black text-white py-3 px-4 rounded-md hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {isSubmitting ? "Submitting..." : "Submit for Verification"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default FarmerVerification;
