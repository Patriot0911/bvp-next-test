import nextEnv from 'next-env';
import dotenvLoad from 'dotenv-load';

dotenvLoad();

const withNextEnv = nextEnv();

/** @type {import('next').NextConfig} */
const nextConfig = {};

export default withNextEnv(nextConfig);
