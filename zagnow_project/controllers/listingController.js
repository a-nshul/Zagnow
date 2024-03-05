const Listing = require('../models/Listing');
const path = require('path');
const createListing = async (req, res) => {
  try {
    const { name, businessPhone, city, address } = req.body;
    if (!name || !businessPhone || !city || !address) {
      return res.status(400).json({ error: 'Missing required fields' });
    }
    const images = req.files.map((file) => path.join('uploads', file.filename));
    const newListing = await Listing.create({
      name,
      businessPhone,
      city,
      address,
      images,
    });
    res.status(200).json({ newListing, message: 'New List created successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getListing = async (req, res) => {
  try {
    const listings = await Listing.find();
    if(!listings){
      res.status(200).json({message: 'Listing not found'});
    }
    res.status(200).json({listings,message: 'Listing found successfully'});
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateListing = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, businessPhone, city, address } = req.body;

    if (!name || !businessPhone || !city || !address) {
      return res.status(400).json({ error: 'Missing required fields' });
    }
    
    const images = req.files.map((file) => path.join('uploads', file.filename));

    const updatedListing = await Listing.findByIdAndUpdate(
      id,
      {
        name,
        businessPhone,
        city,
        address,
        images,
      },
      { new: true }
    );

    if (!updatedListing) {
      return res.status(404).json({ message: 'Listing not found' });
    }

    res.status(200).json({ updatedListing, message: 'Listing updated successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
const deleteListing = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedListing = await Listing.findByIdAndDelete(id);
    if (!deletedListing) {
      return res.status(404).json({ message: 'Listing not found' });
    }
    res.status(200).json({ message: 'Listing deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { createListing, getListing, updateListing, deleteListing };
