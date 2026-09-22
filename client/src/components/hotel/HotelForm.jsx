function HotelForm({
  form,
  setForm,
  handleSubmit,
  buttonText,
  preview,
  handleImageChange,
}) {
  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm({
      ...form,
      [name]: value,
    });
  };

  return (
    <form className="addmenu" onSubmit={handleSubmit}>
      <input
        name="title"
        value={form.title}
        onChange={handleChange}
        required
        placeholder="Enter hotel name"
      />

      <input
        name="description"
        value={form.description}
        onChange={handleChange}
        required
        placeholder="Enter description"
      />

      <input
        type="number"
        name="price"
        value={form.price}
        onChange={handleChange}
        required
        placeholder="Enter price"
      />

      <input
        type="number"
        step="any"
        name="latitude"
        value={form.latitude}
        onChange={handleChange}
        required
        placeholder="Enter latitude"
      />

      <input
        type="number"
        step="any"
        name="longitude"
        value={form.longitude}
        onChange={handleChange}
        required
        placeholder="Enter longitude"
      />

      <input
        type="file"
        name="image"
        accept="image/*"
        onChange={handleImageChange}
      />

      {preview && (
        <img src={preview} alt="Hotel preview" />
      )}

      <button type="submit">{buttonText}</button>
    </form>
  );
}

export default HotelForm;