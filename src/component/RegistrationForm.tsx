import React, { useState } from 'react';
import { Upload, FileText, Send, CheckCircle } from 'lucide-react';
import { Navigate } from 'react-router-dom';

export default function RegistrationForm() {
  const [formData, setFormData] = useState({
    nama: '',
    jurusan: '',
    nim: '',
    kebutuhan: '',
    email: ''
  });
  const [uploadedFile, setUploadedFile] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const [redirect, setRedirect] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFileUpload = (e) => {
    const file = e.target.files?.[0];
    if (file && file.type === 'application/pdf') {
      setUploadedFile(file);
    } else {
      alert('Mohon upload file PDF saja');
      e.target.value = '';
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!formData.nama || !formData.jurusan || !formData.nim || !formData.kebutuhan || !formData.email) {
      alert('Mohon lengkapi semua field yang wajib diisi');
      return;
    }

    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({ nama: '', email: '', jurusan: '', nim: '', kebutuhan: '' });
      setUploadedFile(null);
      setRedirect(true);
    }, 3000);
  };

  if (redirect) {
    return <Navigate to="/Home" replace />;
  }


  if (submitted) {
    return (
      <>
        <div className="success-container">
          <div className="success-card">
            <CheckCircle className="success-icon" />
            <h2 className="success-title">Pendaftaran Berhasil!</h2>
            <p className="success-text">Terima kasih telah mendaftar. Data Anda telah tersimpan.</p>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <div className="main-container">
        <div className="form-wrapper">
          <div className="form-card">
            <div className="form-header">
              <h1 className="form-title">Form Pendaftaran</h1>
              <p className="form-subtitle">Silakan lengkapi informasi berikut dengan teliti</p>
            </div>

            <div className="form-content">
              <div className="form-group">
                <label htmlFor="nama" className="form-label">
                  Nama Lengkap <span className="required">*</span>
                </label>
                <input
                  type="text"
                  id="nama"
                  name="nama"
                  value={formData.nama}
                  onChange={handleInputChange}
                  className="form-input"
                  placeholder="Masukkan nama lengkap Anda"
                />
              </div>

              <div className="form-group">
                <label htmlFor="email" className="form-label">
                  Email <span className="required">*</span>
                </label>
                <input
                  type="text"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="form-input"
                  placeholder="Contoh: malvino@mail.ugm.ac.id"
                />
              </div>

              <div className="form-group">
                <label htmlFor="jurusan" className="form-label">
                  Jurusan <span className="required">*</span>
                </label>
                <input
                  type="text"
                  id="jurusan"
                  name="jurusan"
                  value={formData.jurusan}
                  onChange={handleInputChange}
                  className="form-input"
                  placeholder="Contoh: Ilmu Komputer"
                />
              </div>

              <div className="form-group">
                <label htmlFor="nim" className="form-label">
                  NIM <span className="required">*</span>
                </label>
                <input
                  type="text"
                  id="nim"
                  name="nim"
                  value={formData.nim}
                  onChange={handleInputChange}
                  className="form-input"
                  placeholder="Masukkan Nomor Induk Mahasiswa"
                />
              </div>

              <div className="form-group">
                <label htmlFor="kebutuhan" className="form-label">
                  Kebutuhan <span className="required">*</span>
                </label>
                <textarea
                  id="kebutuhan"
                  name="kebutuhan"
                  value={formData.kebutuhan}
                  onChange={handleInputChange}
                  rows={4}
                  className="form-textarea"
                  placeholder="Jelaskan kebutuhan atau keperluan Anda terkait pendaftaran ini"
                />
              </div>

              <div className="form-group">
                <label className="form-label">
                  Proposal (Opsional)
                </label>
                <div className="upload-container">
                  <input
                    type="file"
                    id="proposal"
                    accept=".pdf"
                    onChange={handleFileUpload}
                    className="file-input"
                  />
                  <label htmlFor="proposal" className="upload-content">
                    {uploadedFile ? (
                      <div className="file-selected">
                        <FileText className="file-icon" />
                        <span className="file-name">{uploadedFile.name}</span>
                      </div>
                    ) : (
                      <div>
                        <Upload className="upload-icon" />
                        <p className="upload-text">Klik untuk upload proposal</p>
                        <p className="upload-hint">Format PDF, maksimal 10MB</p>
                      </div>
                    )}
                  </label>
                </div>
              </div>

              <button
                type="button"
                onClick={handleSubmit}
                className="submit-button"
              >
                <Send className="submit-icon" />
                <span>Kirim Pendaftaran</span>
              </button>

              <p className="form-note">
                <span className="required">*</span> Field wajib diisi
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
