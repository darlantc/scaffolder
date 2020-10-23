import fs from 'fs-extra';
import path from 'path';
import { NoScaffolderFolder  } from '../Errors';
import { isFolder  } from '../filesUtils';

export const TEMPLATE_FOLDER_NAME = 'scaffolder';

export const SEARCH_DEPTH_LIMIT = 25;


export const templatePathsFinder = (currentPath) => {
	const pathsQueue = [];
	const pathRoot = path.parse(currentPath).root;
	const isEndOfPath = (_path) => _path === pathRoot || _path === '/' || _path === '' || _path === './';
	const shouldStopSearching = (_path, depth) => isEndOfPath(_path) || depth === SEARCH_DEPTH_LIMIT;

	const findTemplate = (currentPath, depth = 0) => {

		if (isEndOfPath(currentPath) && pathsQueue.length === 0) {
			throw new NoScaffolderFolder();
		}

		if (shouldStopSearching(currentPath, depth)) {
			return pathsQueue;
		}

		const currentDir = fs.readdirSync(currentPath);

		const isScaffolderFolderInThisLevel = currentDir.some(
			(f) => f === TEMPLATE_FOLDER_NAME
		);

		if (
			isScaffolderFolderInThisLevel &&
      isFolder(currentPath, TEMPLATE_FOLDER_NAME)
		) {
			pathsQueue.push(path.join(currentPath, TEMPLATE_FOLDER_NAME));
		}

		return findTemplate(path.join(currentPath, '../'), depth + 1);
	};
	return findTemplate(currentPath);
};

export type CommandsToPaths = {[key: string]: string};

export const readTemplatesFromPaths =  (paths: string[]): CommandsToPaths => {
	let allCommands = {};
	for (const scaffolderPath of paths) {
		const commands = fs.readdirSync(scaffolderPath);
		if(!commands) {
			continue;
		}
		
		const commandsToPath = commands
			.filter((p) => p && p[0] !== '.')
			.filter(isFolder(scaffolderPath))
			.reduce(
				(accm, cmd) => ({
					...accm, [cmd]: path.join(scaffolderPath, cmd) 
				}),
				{}
			);

		allCommands = {
			...commandsToPath, ...allCommands 
		};
	}
	return allCommands;
};

/**
 * @param {string} currentPath Initial path to start searching from for scaffolder folders.
 * @returns {Object<string, string>} Mapping between each available template and the path the template is located at.
 */
export const commandsBuilder = (currentPath: string) => {
	const scaffolderPaths = templatePathsFinder(currentPath);
	return readTemplatesFromPaths(scaffolderPaths);
};

