import time
from os import listdir
from os.path import isfile, join, dirname
from typing import Iterable, List

import jinja2
from watchdog.events import FileSystemEventHandler, FileSystemEvent
from watchdog.observers import Observer

TEMPLATES_PATH = join(dirname(__file__), 'templates')
COMPONENTS_DIR = 'components'
COMPONENTS_PATH = join(TEMPLATES_PATH, COMPONENTS_DIR)
OUTPUT_PATH = join(dirname(__file__), 'index.html')


def log(message: str) -> None:
    print(f'[{time.strftime("%H:%M:%S")}] {message}')


class TemplateBuilder(FileSystemEventHandler):
    def __init__(self) -> None:
        self.jinja_env = jinja2.Environment(
            loader=jinja2.FileSystemLoader(TEMPLATES_PATH),
            autoescape='html',
            undefined=jinja2.StrictUndefined)

    def on_modified(self, event: FileSystemEvent) -> None:
        if not event.is_directory:
            return
        self.build_output_with_logging()

    def build_output_with_logging(self) -> None:
        try:
            log('Building...')
            components = TemplateBuilder.components()
            self.build_output(components)
            log(f'Built {OUTPUT_PATH} from {", ".join(components)}.')
        except jinja2.exceptions.TemplateSyntaxError as e:
            log(f'Syntax error: {e.filename}, line {e.lineno}: {e.message}.')
        except jinja2.exceptions.TemplateNotFound as e:
            log(f'Template not found: {e.message}.')
        except jinja2.exceptions.TemplateError as e:
            log(f'Template error: {e.message}.')

    def build_output(self, components: List[str]) -> None:
        template = self.jinja_env.get_template('index.html')
        with open(OUTPUT_PATH, 'w') as f:
            f.write(template.render(components=components))

    @staticmethod
    def components() -> List[str]:
        return [join(COMPONENTS_DIR, f) for f in files_in_dir(COMPONENTS_PATH) if not f.endswith('~')]


def files_in_dir(directory: str) -> Iterable[str]:
    return (f for f in listdir(directory) if isfile(join(directory, f)))


def main() -> None:
    observer = Observer()
    template_builder = TemplateBuilder()
    template_builder.build_output_with_logging()
    observer.schedule(
        event_handler=template_builder,
        path=TEMPLATES_PATH,
        recursive=True)
    observer.start()
    observer.join()


if __name__ == '__main__':
    main()
