import mongoose from 'mongoose';

export const establishDBConnection = async () => {
  try {
    await mongoose.connect(
      `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@clroom.la1sw11.mongodb.net/?retryWrites=true&w=majority`
    );
    console.log(`Db connected!`);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};
