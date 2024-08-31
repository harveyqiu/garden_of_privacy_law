import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const contentDirectory = path.join(process.cwd(), 'content');

export function getAllContentFiles() {
  return fs.readdirSync(contentDirectory);
}

export function getContentData(filename) {
  const fullPath = path.join(contentDirectory, filename);
  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const { data, content } = matter(fileContents);

  const [jurisdiction, topic] = filename.replace(/\.md$/, '').split('.');

  return {
    jurisdiction,
    topic,
    content,
    ...data,
  };
}

export function getAllTopics() {
  const files = getAllContentFiles();
  const topics = new Set(files.map(file => file.split('.')[1]));
  return Array.from(topics);
}

export function getAllJurisdictions() {
  const files = getAllContentFiles();
  const jurisdictions = new Set(files.map(file => file.split('.')[0]));
  return Array.from(jurisdictions);
}