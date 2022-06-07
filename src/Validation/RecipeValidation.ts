import {array, number, object, string} from "yup";

export const RecipeSchema = object().shape({
  name: string()
    .required('Der Name ist Erforderlich'),
  time: number()
    .typeError('Bitte Zahl eingeben')
    .positive('Bitte positive Zahl eingeben')
    .integer('Bitte ganze Zahl eingeben')
    .lessThan(10000)
    .required('Die Zeit ist Erforderlich'),
  level: number()
    .required()
    .moreThan(-1)
    .lessThan(3),
  rating: number()
    .required()
    .moreThan(0)
    .lessThan(6),
  user: number()
    .required(),
  ingredients: array()
    .of(
      object().shape({
        name: string().required("Zutatenname wird benötigt"),
        amount: number()
            .typeError('Bitte Zahl eingeben')
            .positive('Bitte positive Zahl eingeben')
            .lessThan(10000),
        unit: string()
        }
      )
    )
    .min(1,'Mindestends eine Zutat'),
  preparation: array()
    .of(string()
      .required("Schritt wird benötigt!")
    )
    .min(1,'Mindestends einen Schritt')
});
