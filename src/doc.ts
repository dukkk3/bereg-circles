//  BeregCircles.play() - запускает сцену

//  BeregCircles.stop() - останавливает сцену

//  BeregCircles.destroy(complete: boolean) - деструктор. Флаг "complete" указывает на то, необходимо ли полностью удалить сцену, включая стили.

//  BeregCircles.bootstrap() - инициализирует сцену

// BeregCircles(container: HTMLElement, options: ISpaceOptions) - конструктор объекта.

// Состояния сфер
type ShapeStateKind = "active" | "initial" | "primary";

// Интерфейс категории
interface ICategoryOptions {
	key: string; // Идентификатор категории
	bodyOptions?: IBodyDefinition; // Физические свойства сферы (https://brm.io/matter-js/docs/classes/Body.html)
	stateURL: {
		// Список с фоновыми изображениями разных состояний
		[K in ShapeStateKind]: string;
	};
}

interface ISpaceOptions {
	categories: ICategoryOptions[];
	common: {
		mass: {
			// Список массы сфер в разных состояниях
			[K in ShapeStateKind]: number;
		};
		size: {
			// Список радиуса сфер в разных состояниях
			[K in ShapeStateKind]: number;
		};
		selector: {
			className: {
				// Классовые селекторы компонентов (без точек)
				shape: string; // Класс для контейнера сферы с иконками
				shapeIcon: string; // Класс для иконок
				container: string; // Класс для контейнера в котором находится сцена
				space: string; // Класс для контейнера сцены
				state: {
					// Классы для разных состояний
					[K in ShapeStateKind]: string;
				};
			};
		};
	};
	engine: IEngineDefinition; // Свойства физического движка (https://brm.io/matter-js/docs/classes/Engine.html)
	renderer: {
		angleFactor: number; // Коэффицент угла поворота для сферы (умол. 0)
		resizeType: "scale" | "rect"; // Тип изменение размера сферы (умол. scale)
	};
	view: {
		layerFactor: number; // Количество сфер на окружность при появлении (умол. 4)
		hideTime: number; // Общее время на скрытие всех сфер
		showTime: number; // Общее время на появление всех сфер
	};
	onSelect?: (payload: { key: string; state: ShapeStateKind }) => void; // Функция, вызываемая каждый раз, как у какой-либо сферы меняется состояние
}
