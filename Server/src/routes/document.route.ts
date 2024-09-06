import { Router } from "express";
import { authenticate } from "../middleware/auth";
import { documentController } from "../controllers/document/document.controller";
import { documentValidator } from "../validators/document.validator";
import { shareValidator } from "../validators/share.validator";
import { shareController } from "../controllers/document/share/share.controller";

const router = Router();

// get the document demanded by user
router.get("/:id", authenticate, documentController.getOne);
// if on home page get all the documents
router.get("/", authenticate, documentController.getAll);
// to Update the Document
router.put(
  "/:id",
  authenticate,
  documentValidator.update,
  documentController.update
);
// create a new Document
router.post("/", authenticate, documentController.create);
// Delete a Document
router.delete("/:id", authenticate, documentController.delete);

// sharing a document to a particular user
router.post(
  "/:id/share",
  authenticate,
  shareValidator.create,
  shareController.create
);

router.delete(
  "/:documentId/share/:userId",
  authenticate,
  shareController.delete
);

export default router;